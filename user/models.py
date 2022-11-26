from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models


# Create your models here.
class User(AbstractBaseUser):
    profile_image = models.TextField();
    user_id = models.CharField(max_length=24, unique=True)
    user_name = models.CharField(max_length=24)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "user_id"

    class Meta:
        db_table = "User"
