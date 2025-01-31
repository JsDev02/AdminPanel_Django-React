from django.contrib import admin

from .models import FrontInfo


@admin.register(FrontInfo)
class FrontInfoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'image')  # Campos que se mostrarán en la lista
