from django.db import models
from django.contrib.auth import get_user_model

class Todo(models.Model):
    task = models.CharField(max_length=50)
    is_completed = models.BooleanField(default=False)
    memo = models.TextField(max_length=50, null=True, blank=True)
    deadline = models.DateField(null=True, blank=True)
    user = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.task