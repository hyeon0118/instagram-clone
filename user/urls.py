from django.urls import path
from .views import Join

urlpatterns = [
    path("join", Join.as_view())
]
