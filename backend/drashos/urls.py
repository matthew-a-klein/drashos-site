from django.urls import path

from . import views
# from .views import api_home


urlpatterns = [
    path('list/', views.drashah_list_view), # localhost:8000/api/drashos
    path('create/', views.drashah_create_view)
]

