from django.contrib import admin
from .models import Drashah
# Register your models here.

class DrashahAdmin(admin.ModelAdmin):
    list_display = ('title', 'description')

admin.site.register(Drashah, DrashahAdmin)