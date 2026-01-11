from django.urls import include, path

urlpatterns = [
    path("accounts/", include("accounts.urls")),
    path("skills/", include("skills.urls")),
]