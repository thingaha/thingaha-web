import os
import base64
import uuid

from flask.helpers import url_for
from common.aws_client import get_client, get_s3_url, get_bucket
from common.config import S3_BUCKET, UPLOAD_DIR, UPLOAD_PATH
from common.logger import get_common_logger
from common.error import FileExtensionNotAllowed
from botocore.exceptions import ClientError

# os.makedirs(UPLOAD_DIR, exists_ok=True)

MAX_CONTENT_LENGTH= 1024 * 1024
UPLOAD_EXTENSIONS= ['.jpg', '.png', '.gif']


class FileUploadService:
    """
    Parent Service Class for CRUD actions
    """
    def __init__(self, logger=None) -> None:
        if logger is None:
            logger = get_common_logger(__name__)
        self.logger = logger

    def __is_dev(self):
        """
        check env
        """
        return os.environ.get("SCRIPT_ENV") != "production"

    def upload(self, uploaded_file):
        self.uploaded_file = uploaded_file
        self.filename = self.__generate_url_safe_random_filename()
        self.file_ext = os.path.splitext(uploaded_file.filename)[1]
        self.full_filename = f"{self.filename}{self.file_ext}"

        if self.__is_dev():
            self.logger.info("Using local photo upload feature.")
            return self.upload_local()
        else:
            return self.upload_to_s3()

    def delete_uploaded_file(self, url):
        """
        delete image file
        :params: url : str
        return: True or False
        """
        filename = url.split("/")[-1]
        if self.__is_dev():
            self.logger.info(f"Deleting an uploaded file {filename}")
            os.remove(os.path.join(UPLOAD_DIR, filename))
            print("REMOVED", os.path.join(UPLOAD_DIR, filename))
            return True
        try:
            my_bucket = get_bucket()
            my_bucket.Object(filename).delete()
            return True
        except ClientError as error:
            self.logger.error("File delete error %s", error)
            return False

    def upload_local(self):
        try:
            target_path = os.path.join(UPLOAD_DIR, self.full_filename)
            self.logger.info(f"Local upload {target_path}")

            self.uploaded_file.save(target_path)
            self.uploaded_path = url_for('static', filename=self.full_filename, _external=True)
            self.logger.info(f"Uploaded path {self.uploaded_path}")
            return True
        except Exception as error:
            self.logger.error("File upload error %s", error)
            return False

    def upload_to_s3(self):
        s3_client = get_client()

        try:
            s3_client.upload_fileobj(self.uploaded_file, S3_BUCKET, self.full_filename, ExtraArgs={"ACL": "public-read"})
            self.uploaded_path = get_s3_url().format(S3_BUCKET, self.full_filename)
            return True
        except ClientError as error:
            self.logger.error("File upload error %s", error)
            return False

    @staticmethod
    def __generate_url_safe_random_filename():
        return base64.urlsafe_b64encode(uuid.uuid4().bytes).decode('utf-8').replace('=', '')
