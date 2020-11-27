"""aws client file for s3 package"""
import boto3

from common.config import S3_KEY, S3_SECRET, S3_BUCKET
from common.config import load_config

conf = load_config()


def _get_s3_resource():
    """
    get s3 client
    """
    if S3_KEY and S3_SECRET:
        return boto3.resource(
            "s3",
            aws_access_key_id=S3_KEY,
            aws_secret_access_key=S3_SECRET
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
