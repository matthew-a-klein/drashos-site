# Generated by Django 4.1.4 on 2023-06-07 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drashos', '0008_rename_relatedcategories_category_related_categories'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='related_categories',
        ),
        migrations.AddField(
            model_name='category',
            name='subcategory',
            field=models.ManyToManyField(blank=True, related_name='supercategories', to='drashos.category'),
        ),
        migrations.DeleteModel(
            name='HierarchicalRelationship',
        ),
    ]
