from django.shortcuts import render, redirect
from rest_framework.exceptions import APIException
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import check_password


@api_view(['GET'])
def get_tasks(request, id=None):
    task = Task.objects.filter(user=id).order_by('id').values()
    print(task)
    return Response(task, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def create_task(request,id):
    print("DATA",request.data)
    print("USER",request.user)
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)
    

@api_view(['POST'])
def sign_up(request):
    print(request.data)
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response("User added successfully!")

@api_view(['POST'])
def sign_in(request):
    print(request.data)
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    print("user_id", user)
    if user:
        login(request, user)
        return Response(
            {
                "message": "Login successful",
                "username": user.username,
                "user_id": user.id
            }, status=status.HTTP_201_CREATED
        )
    else:
        return Response({
            "error": "Invalid credentials"
        }, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['DELETE'])
def delete_task(request, id):
    task = get_object_or_404(Task, id=id)
    task.delete()
    return Response({"message": "Deleted successfully"}, status=200)

@api_view(['PATCH'])
def update_task(request, id):

    task = get_object_or_404(Task, id=id)

    serializer = TaskSerializer(task, data=request.data, partial=True)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
    return Response(serializer.data, status=200)

@api_view(['GET'])
def get_task(request, id):
    task = get_object_or_404(Task, id=id)
    serializer = TaskSerializer(task)
    return Response(serializer.data, status=200)