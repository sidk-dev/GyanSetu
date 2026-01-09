from django.urls import path
from . import views

urlpatterns = [
    path("", views.account, name="account"),

    path("login/", views.login, name="login"),
    path("register/", views.register, name="register"),
    path("change-password/", views.change_password, name="change-password"),

    path("forgot-password/", views.forgot_password, name="forgot-password"), # email support.
    path("reset-password/<uidb64>/<token>/", views.reset_password, name="reset-password"),
]