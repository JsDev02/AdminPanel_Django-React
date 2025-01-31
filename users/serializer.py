from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role','last_login', 'session_duration', 'button_clicks_1', 'button_clicks_2']

class AdminUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ['id', 'username', 'name', 'role', 'session_duration', 'last_login', 'button_clicks_1', 'button_clicks_2']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['id'] = self.user.id
        data['role'] = self.user.role 
        data['name'] = self.user.name
        return data
