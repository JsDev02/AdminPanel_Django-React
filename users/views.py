from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied  # Importación añadida
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User
from .serializer import (AdminUserSerializer, CustomTokenObtainPairSerializer,
                         UserSerializer)


class UserView(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.user.role == 1:
            return AdminUserSerializer
        return UserSerializer

    def get_queryset(self):
        if self.request.user.role == 1:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)

    def list(self, request, *args, **kwargs):
        if request.user.role != 1:
            return Response({"detail": "No tienes permiso"}, status=status.HTTP_403_FORBIDDEN)
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance != request.user and request.user.role != 1:
            return Response({"detail": "No tienes permiso"}, status=status.HTTP_403_FORBIDDEN)
        return super().retrieve(request, *args, **kwargs)

    def perform_update(self, serializer):
        if self.request.user != serializer.instance and self.request.user.role != 1:
            raise PermissionDenied("No puedes modificar otro usuario")
        serializer.save()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


