from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('El usuario debe tener un nombre de usuario')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 1)  # 1 = Admin
        return self.create_user(username, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    USER_ROLES = [
        (0, 'User'),
        (1, 'Admin'),
    ]

    username = models.CharField(max_length=150, unique=True)
    name = models.CharField(max_length=150, blank=True)
    role = models.IntegerField(choices=USER_ROLES, default=0)
    session_duration = models.DurationField(null=True, blank=True)
    last_login = models.DateTimeField(null=True, blank=True)
    button_clicks_1 = models.IntegerField(default=0)
    button_clicks_2 = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username