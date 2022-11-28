from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from django.contrib.auth.hashers import make_password


# Create your views here.
class Join(APIView):
    def get(self, request):
        return render(request, "user/join.html")

    def post(self, request):
        email = request.data.get('email', None)
        user_id = request.data.get('user_id', None)
        user_name = request.data.get('user_name', None)
        password = request.data.get('password', None)

        User.objects.create(email=email,
                            user_id=user_id,
                            user_name=user_name,
                            password=make_password(password),
                            profile_image="default_profile.jpg")

        return Response(status=200)


class Login(APIView):
    def get(self, request):
        return render(request, "user/login.html")

    def post(self, request):
        email = request.data.get('email', None)
        password = request.data.get('password', None)

        user = User.objects.filter(email=email).first()

        if user is None:
            return Response(status=400, data=dict(
                message="Leider ist dein eingegebenes Passwort oder deine E-Mail-Adresse falsch."))

        if user.check_password(password):
            request.session['email'] = email
            return Response(status=200)
        else:
            return Response(status=400, data=dict(
                message="Leider ist dein eingegebenes Passwort oder deine E-Mail-Adresse falsch."))
