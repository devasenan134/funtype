from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Quote(models.Model) :
    text = models.TextField()

    def __str__(self) :
        return self.text
