from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, blank=False, null=False)
    display_name = models.CharField(max_length=255, blank=True, null=True, unique=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    #profile_picture = models.ImageField(upload_to='profile_pics', blank=True) ***would need to install pillow for this***
    bio = models.TextField(blank=True)