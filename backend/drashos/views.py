
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import DrashahSerializer
from .models import Drashah

# Create your views here.

@api_view(['POST'])
def drashos_api(request, *args, **kwargs):
    """
    DRF API View
    """
    serializer = DrashahSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        print(serializer.data)
        return Response(serializer.data)
    return Response({"invalid": "not good data"}, status=400)