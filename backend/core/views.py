from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from .models import Ping
from .serializers import PingSerializer
from .tasks import create_ping_task

@csrf_exempt
@api_view(["POST"])
def create_ping(request):
    ping = Ping.objects.create()
    return Response(PingSerializer(ping).data)

@csrf_exempt
@api_view(["GET"])
def health(request):
    return Response({"ok": True})

@csrf_exempt
@api_view(["POST"])
def enqueue_ping(request):
    job = create_ping_task.delay()
    return Response({"task_id": job.id})

@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def auth_login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)
    if user is None:
        return Response({"error": "Invalid credentials"}, status=401)
    login(request, user)
    return Response({"username": user.username})

@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def auth_logout(request):
    logout(request)
    return Response({"ok": True})

@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def auth_register(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if not username or not password:
        return Response({"error": "Username and password required"}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username taken"}, status=400)
    user = User.objects.create_user(username=username, password=password)
    login(request, user)
    return Response({"username": user.username})

@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def auth_me(request):
    if not request.user.is_authenticated:
        return Response({"error": "Not authenticated"}, status=401)
    return Response({"username": request.user.username})
