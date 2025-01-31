from django.contrib import admin

from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ['id','name', 'username', 'role','last_login', 'session_duration', 'button_clicks_1', 'button_clicks_2']
    list_filter = ['role', 'is_active']
    search_fields = ['username']

admin.site.register(User, UserAdmin)
