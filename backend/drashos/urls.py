from django.urls import path

from . import views
# from .views import api_home


urlpatterns = [
    path('', views.drashos_api) # localhost:8000/api/
]