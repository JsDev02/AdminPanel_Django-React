from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import FrontInfoViewSet

router = DefaultRouter()
router.register(r'', FrontInfoViewSet, basename='frontinfo')

urlpatterns = [
    path('frontinfo/', include(router.urls)),  # Usar 'frontinfo/' para evitar el conflicto
]
