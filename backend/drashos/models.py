from django.db import models

class Drashah(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=120)