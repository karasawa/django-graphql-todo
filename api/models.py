from django.db import models

class Todo(models.Model):
    task = models.CharField(max_length=50)
    is_completed = models.BooleanField(default=False)
    memo = models.TextField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.task