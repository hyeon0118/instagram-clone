from django.contrib import admin
from django.urls import path, include
from content.views import Main, Profile, EditProfile
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("main/", Main.as_view()),
    path("content/", include("content.urls")),
    path("user/", include("user.urls")),
    path("profile/", Profile.as_view()),
    path("edit/", EditProfile.as_view()),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
