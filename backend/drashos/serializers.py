from rest_framework import serializers
from .models import Drashah

class DrashahSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drashah
        fields = ('id', 'title', 'description',)