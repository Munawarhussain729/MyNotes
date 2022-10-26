from dataclasses import field, fields
from pyexpat import model
from rest_framework.serializers import ModelSerializer
from .models import Note

class NoteSerizlizer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'