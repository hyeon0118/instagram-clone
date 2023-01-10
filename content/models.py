from django.db import models


# Create your models here.
class Feed(models.Model):
    content = models.TextField()
    image = models.TextField()
    user_id = models.TextField()
    like_count = models.IntegerField(default="0")


class User(models.Model):
    user_id = models.TextField()
    profile_image = models.TextField()
