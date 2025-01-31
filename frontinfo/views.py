from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import FrontInfo
from .serializers import FrontInfoSerializer


class FrontInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FrontInfo.objects.all()
    serializer_class = FrontInfoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
