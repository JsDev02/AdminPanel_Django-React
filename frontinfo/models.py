from django.db import models


class FrontInfo(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    image = models.CharField(max_length=255, null=False, blank=False, default="/src/assets/react.svg")

    def __str__(self):
        return self.title
