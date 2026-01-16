from django.urls import path
from . import views

urlpatterns = [
    path("", views.skills, name='skills'),
    path("<int:pk>/", views.edit_skill, name='edit-skill'),
]