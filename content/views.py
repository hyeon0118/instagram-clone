from django.shortcuts import render
from rest_framework.views import APIView
from .models import Feed


# Create your views here.
class Main(APIView):
    def get(self, request):
        feed_list = Feed.objects.all().order_by('-id')
        return render(request, "hyeonstagram/main.html", context=dict(feed_list=feed_list))
