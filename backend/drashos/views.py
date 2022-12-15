from django.shortcuts import render

from django.shortcuts import render
from rest_framework import viewsets
from .serializers import DrashahSerializer
from .models import Drashah

# Create your views here.

class DrashahView(viewsets.ModelViewSet):
    serializer_class = DrashahSerializer
    queryset = Drashah.objects.all()
