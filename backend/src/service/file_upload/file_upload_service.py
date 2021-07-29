import base64
import os
import uuid

from botocore.exceptions import ClientError
from flask.helpers import url_for

from common.aws_client import get_client, get_s3_url, get_bucket
from common.config import S3_BUCKET, UPLOAD_DIR
from common.error import FileExtensionNotAllowed
from common.logger import get_common_logger

UPLOAD_EXTENSIONS = ['.jpg', '.png', '.gif']


class FileUploadService:
    """
    Parent Service Class for CRUD actions
    """
    def __init__(self, logger=None) -> None:
        if logger is None:
            logger = get_common_logger(__name__)
        self.logger = logger
        self.uploaded_path = None

    @staticmethod
    def __is_dev():
        """
        check env
        """
        return os.environ.get("SCRIPT_ENV") != "production"

    def upload(self, uploaded_file) -> bool:
        """

        :param uploaded_file:
        :type uploaded_file:
        :return:
        :rtype:
        """
        filename = self.__generate_url_safe_random_filename()
        file_ext = os.path.splitext(uploaded_file.filename)[1]
        if file_ext not in UPLOAD_EXTENSIONS:
            self.logger.error("File extension should be '.jpg', '.png', '.gif'")
            raise FileExtensionNotAllowed("File extension should be '.jpg', '.png', '.gif'")
        full_filename = f"{filename}{file_ext}"

        if self.__is_dev():
            self.logger.info("Using local photo upload feature.")
            return self.upload_local(uploaded_file, full_filename)
        else:
            return self.upload_to_s3(uploaded_file, full_filename)

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
            return True
        try:
            my_bucket = get_bucket()
            my_bucket.Object(filename).delete()
            return True
        except ClientError as error:
            self.logger.error("File delete error %s", error)
            return False

    def upload_local(self, uploaded_file, full_filename: str) -> bool:
        """
        save photo in local
        @param uploaded_file:
        @param full_filename:
        @return:
        @rtype: bool
        """
        try:
            target_path = os.path.join(UPLOAD_DIR, full_filename)
            self.logger.info(f"Local upload {target_path}")

            uploaded_file.save(target_path)
            self.uploaded_path = url_for('static', filename=full_filename, _external=True)
            self.logger.info(f"Uploaded path {self.uploaded_path}")
            return True
        except Exception as error:
            self.logger.error("File upload error %s", error)
            return False

    def upload_to_s3(self, uploaded_file, full_filename) -> bool:
        """
        upload photo to s3, production server
        @param uploaded_file:
        @param full_filename:
        @return:
        @rtype: book
        """
        s3_client = get_client()
        try:
            s3_client.upload_fileobj(uploaded_file, S3_BUCKET, full_filename, ExtraArgs={"ACL": "public-read"})
            self.uploaded_path = get_s3_url().format(S3_BUCKET, full_filename)
            self.logger.info(f"Uploaded path {self.uploaded_path}")
            return True
        except ClientError as error:
            self.logger.error("File upload error %s", error)
            return False

    @staticmethod
    def __generate_url_safe_random_filename() -> str:
        """
        generate url safe random file
        @return:
        @rtype:
        """
        return base64.urlsafe_b64encode(uuid.uuid4().bytes).decode("utf-8").replace("=", "")
