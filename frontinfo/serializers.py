from rest_framework import serializers

from .models import FrontInfo


class FrontInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrontInfo
        fields = ['title', 'description', 'image']  # Ajusta los campos si es necesario
