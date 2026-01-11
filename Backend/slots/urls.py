from django.urls import path
from . import views

urlpatterns = [
    path("", views.slots, name='slots'),
    path("<int:id>/", views.delete_slot, name='delete-slot'),
    path("book/<int:id>/", views.book_slot, name='book-slot'),
]