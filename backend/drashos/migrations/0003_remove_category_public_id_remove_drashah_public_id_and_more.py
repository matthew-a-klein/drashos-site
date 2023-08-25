# Generated by Django 4.1.4 on 2023-06-07 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drashos', '0002_audiofile_drashah_date_added_drashah_public_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='public_id',
        ),
        migrations.RemoveField(
            model_name='drashah',
            name='public_id',
        ),
        migrations.AlterField(
            model_name='drashah',
            name='audio',
            field=models.FileField(blank=True, null=True, upload_to='get_file_path'),
        ),
        migrations.DeleteModel(
            name='AudioFile',
        ),
    ]
