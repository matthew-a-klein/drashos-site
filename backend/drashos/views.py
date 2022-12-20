
from rest_framework import generics
from .serializers import DrashahSerializer
from .models import Drashah


class DrashahCreateAPIView(generics.CreateAPIView):
    queryset = Drashah.objects.all()
    serializer_class = DrashahSerializer

drashah_create_view = DrashahCreateAPIView.as_view()

class DrashahListAPIView(generics.ListAPIView):
    queryset = Drashah.objects.all()
    serializer_class = DrashahSerializer
   
drashah_list_view = DrashahListAPIView.as_view()