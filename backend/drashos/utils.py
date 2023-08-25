from uuid import UUID
import base64
from django.core.files.base import ContentFile


def is_valid_uuid(uuid_to_test, version=4):
    """
    Check if uuid_to_test is a valid UUID.
    """

    try:
        uuid_obj = UUID(uuid_to_test, version=version)
    except ValueError:
        return False
    return str(uuid_obj) == uuid_to_test


def string_to_file(base64_string, file_name):
    format, audstr = base64_string.split(';base64,')
    ext = format.split('/')[-1]
    audio_file = ContentFile(base64.b64decode(audstr),
                             name=f'{file_name}.' + ext)
    return audio_file
