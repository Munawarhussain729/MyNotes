from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    return Response('Our API')

@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by('-updated')
    serilaizer = NoteSerializer(notes, many=True)
    return Response(serilaizer.data)


@api_view(['GET'])
def getNote(request, note_id):
    note = Note.objects.get(id = note_id)
    serilaizer = NoteSerializer(note, many=False)
    return Response(serilaizer.data)


@api_view(['PUT'])
def updateNote(request, note_id):
    data = request.data
    note = Note.objects.get(id = note_id)
    serializer = NoteSerializer(instance=note, data=data)

    if(serializer.is_valid()):
        serializer.save()
    
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteNode(request,note_id):
    note = Note.objects.get(id=note_id)
    note.delete()
    return Response('Note was deleted')


@api_view(['POST'])
def createNote(request):
    data = request.data
    note = Note.objects.create(
        body = data['body']
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)
