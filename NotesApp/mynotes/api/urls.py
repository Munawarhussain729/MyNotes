from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('notes/', views.getNotes, name="notes"),
    path('notes/create/', views.createNote, name="create-note"),
    path('notes/<str:note_id>/update/', views.updateNote, name="update-note"), 
    path('notes/<str:note_id>/delete/', views.deleteNode, name="delete-note"),
    path('notes/<str:note_id>', views.getNote, name="note"),
    
]   