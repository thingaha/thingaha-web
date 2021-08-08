"""aws client file for s3 package"""
import boto3

from common.config import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET
from common.config import load_config

conf = load_config()


def _get_s3_resource():
    """
    get s3 client
    """
    if AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY:
        return boto3.resource(
            "s3",
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY
        )
    else:
        return boto3.resource("s3")


def get_client():
    """
    get all buckets list from s3
    """
    return boto3.client("s3")


def get_s3_url():
    """
    get s3 url path
    """
    return conf["common"]["aws"]["url"]


def get_bucket():
    """
    get bucket for actions
    """
    s3_resource = _get_s3_resource()
    return s3_resource.Bucket(S3_BUCKET)
