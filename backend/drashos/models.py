from django.db import models
from drf_extra_fields.fields import Base64FileField
import uuid
import os
from django.core.exceptions import ValidationError
import datetime


def audio_file_upload_path(instance, filename):
    now = datetime.datetime.now()
    return (
        f"date_{now.year}_{now.month}_{now.day}/"
        f"time_{now.hour}_{now.minute}_{now.second}/"
        f"{filename}"
    )


def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = ['.mp3', '.mpeg', '.wav']
    if not ext.lower() in valid_extensions:
        raise ValidationError(u'Unsupported file extension.')


class Category(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    title = models.CharField(max_length=30)
    subcategory = models.ManyToManyField(
        "self", blank=True,  related_name='supercategories', symmetrical=False)
    supercategory = models.ManyToManyField(
        "self", blank=True,  related_name='subcategories', symmetrical=False)
    description = models.CharField(max_length=120, blank=True)
    date_added = models.DateField(auto_now_add=True,)

    def __str__(self):
        return self.title


class Drashah(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=120)
    category = models.ManyToManyField(Category, blank=True)
    date_added = models.DateField(auto_now_add=True)
    audio = models.FileField(upload_to=audio_file_upload_path, validators=[
                             validate_file_extension], blank=True, null=True, max_length=255)

    def __str__(self):
        return self.title
