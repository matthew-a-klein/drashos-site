from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register(r'drashos', views.DrashahViewset, basename='drashos')
router.register(r'drashosids', views.DrashahIDNameViewset,
                basename='drashosids')

router.register(r'categories', views.CategoryViewset, basename='categories')
urlpatterns = [
    path('', include(router.urls))
]
