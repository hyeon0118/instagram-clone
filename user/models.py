from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models


# Create your models here.
class User(AbstractBaseUser):
    profile_image = models.TextField();
    user_id = models.CharField(max_length=24, unique=True)
    user_name = models.CharField(max_length=24)
    email = models.EmailField(unique=True)
    profile_text = models.TextField(default=" ")
    feed_number = models.IntegerField(default="0")
    follower_number = models.IntegerField(default="0")
    following_number = models.IntegerField(default="0")

    USERNAME_FIELD = "user_id"

    class Meta:
        db_table = "User"
