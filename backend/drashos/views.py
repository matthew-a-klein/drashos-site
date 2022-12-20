
from rest_framework.response import Response
from django.forms.models import model_to_dict
from rest_framework.decorators import api_view
from .serializers import DrashahSerializer
from .models import Drashah

# Create your views here.

@api_view(['POST', 'GET'])
def drashos_api(request, *args, **kwargs):
    if request.method =='POST':
        serializer = DrashahSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response({"invalid": "not good data"}, status=400)
    if request.method == "GET":
        
        queryset = Drashah.objects.all() 
        data = DrashahSerializer(queryset, many=True).data
        return Response(data)