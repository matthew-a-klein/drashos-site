from rest_framework import serializers
from .models import Drashah, Category
from drf_extra_fields.fields import Base64FileField


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['title', 'subcategory', 'supercategory', 'description']

    def create(self, validated_data):
        data = validated_data.copy()

        subcategories = data.pop('subcategories')
        supercategories = data.pop('supercategories')

        category = Category.objects.create(**data)

        for subcategory in subcategories:

            subcategory = Category.objects.get(id=subcategory)
            category.subcategory.add(subcategory)
            subcategory.supercategory.add(category)

        for supercategory in supercategories:
            supercategory = Category.objects.get(id=supercategory)
            category.supercategory.add(supercategory)
            supercategory.subcategory.add(subcategory)

    def update(self, validated_data, instance):
        data = validated_data.copy()

        instance.title = data.get("title")
        instance.description = data.get("description")

        # Deal with the many to one realtionships,
        # 1) Remove the instance form other instances realtionships
        # 2) Clear the instances relationships
        # 3) Add the realtionships that have been sent to the update

        for subcategory in instance.subcategory.all():

            subcategory = Category.objects.get(id=subcategory.id)
            subcategory.supercategory.remove(instance)

        for supercategory in instance.supercategory.all():
            supercategory = Category.objects.get(id=supercategory.id)
            supercategory.subcategory.remove(instance)

        instance.subcategory.clear()
        instance.supercategory.clear()

        for subcategory in data.get("subcategories"):
            subcategory = Category.objects.get(id=subcategory)
            instance.subcategory.add(subcategory)
            subcategory.supercategory.add(instance)

        for supercategory in data.get("supercategories"):
            supercategory = Category.objects.get(id=supercategory)
            instance.supercategory.add(supercategory)
            supercategory.subcategory.add(instance)

        instance.save()


class CategoryIDNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['title', 'id']


class DrashahSerializer(serializers.ModelSerializer):

    class Meta:
        model = Drashah
        fields = ['title', 'id', 'description', 'category', 'audio']

    def create(self, validated_data):
        data = validated_data.copy()
        categories = data.pop('categories')
        drashah = Drashah.objects.create(**data)
        for category in categories:
            category = Category.objects.get(id=category)
            drashah.category.add(category)
        drashah.save()
        return drashah

    def update(self, instance, validated_data):
        data = validated_data.copy()

        instance.title = data.get('title')
        instance.description = data.get('description')

        # Remove all the categories that are in the relationship now,
        # then append the ones that have been added
        instance.category.clear()
        categories = data.pop('categories')

        for category in categories:
            category = Category.objects.get(id=category)
            instance.category.add(category)

        if (data.get("audio")):
            instance.audio = data.get("audio")

        instance.save()
        return instance


class DrashahIDNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drashah
        fields = ['title', 'id']


class DrashahAudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drashah
        fields = ['audio']
