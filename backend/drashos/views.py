import base64
from rest_framework import viewsets, status
from .serializers import DrashahSerializer, CategorySerializer, DrashahIDNameSerializer, CategoryIDNameSerializer
from .models import Drashah, Category
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .utils import string_to_file


class DrashahViewset(viewsets.ModelViewSet):
    queryset = Drashah.objects.all()

    serializer_class = DrashahSerializer
    lookup_field = 'id'

    @action(detail=False, methods=['get'], url_path=r'list-ids')
    def listIds(self, request):
        queryset = Drashah.objects.all()
        serializer = DrashahIDNameSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, permission_classes=[IsAdminUser], methods=['post'], url_path=r'create')
    def create_drashah(self, request):
        data = request.data.copy()
        audio = data.pop("audio")
        if (audio != ""):
            file_name = data.pop("fileName")
            audio_file = string_to_file(audio, file_name)
            data["audio"] = audio_file

            serializer = DrashahSerializer(
                data=data)
            if serializer.is_valid():
                serializer.create(validated_data=data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(exception="You must provide some audio", status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, permission_classes=[IsAuthenticated], methods=['post'], url_path=r'edit/(?P<drashah_id>[\w-]+)')
    def edit_drashah(self, request, drashah_id=None):
        try:
            instance = Drashah.objects.get(id=drashah_id)
            data = request.data.copy()

            new_data = {
                "title": data["title"],
                "description": data["description"],
                "categories": data["categories"]
            }

            audio = request.data.get("audio")
            if (audio != ""):

                audio_file = string_to_file(
                    audio, request.data.get("fileName"))
                new_data["audio"] = audio_file

            serializer = self.serializer_class(
                data=new_data,
                partial=True
            )

            if serializer.is_valid():
                serializer.update(validated_data=new_data, instance=instance)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, permission_classes=[IsAuthenticated], methods=['post'], url_path=r'delete/(?P<drashah_id>[\w-]+)')
    def delete_drashah(self, request, drashah_id=None):
        try:
            instance = Drashah.objects.get(id=drashah_id)
            instance.delete()
            return Response(data="Successfully deleted", status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class DrashahIDNameViewset(viewsets.ModelViewSet):
    queryset = Drashah.objects.all()
    serializer_class = DrashahIDNameSerializer
    lookup_field = 'id'

    @action(detail=False, methods=['GET'], url_path=r'drashosbycategory/(?P<category_id>[\w-]+)')
    def drashos_by_category(self, request, category_id=None):
        category = Category.objects.get(id=category_id)

        if category:
            drashos = Drashah.objects.filter(
                category=category_id
            )
            serializer = DrashahIDNameSerializer(
                drashos, many=True)
            return Response(data=serializer.data,  status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)


class CategoryViewset(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'id'

    @action(detail=False, methods=['GET'], url_path=r'list-ids')
    def listIds(self, request):
        queryset = Category.objects.all()
        serializer = CategoryIDNameSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['POST'], url_path=r'create')
    def create_category(self, request):
        data = request.data
        serializer = CategorySerializer(data=data)

        if serializer.is_valid():
            serializer.create(validated_data=data)
            return Response(status=status.HTTP_201_CREATED, data=data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'], url_path=r'edit')
    def edit_category(self, request):
        data = request.data.copy()
        instance = Category.objects.get(id=data.pop("id"))

        serializer = self.serializer_class(
            data=data,
            partial=True
        )
        if serializer.is_valid():
            serializer.update(validated_data=data, instance=instance)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'], url_path=r'delete')
    def delete_category(self, request):
        id = request.data["id"]
        try:
            instance = Category.objects.get(id=id)
            instance.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
