from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Ping
from .serializers import PingSerializer
from .tasks import create_ping_task
from django.shortcuts import render

# Deprecated, can be used for testing
# def ws_test(request):
#     return render(request, "ws_test.html")

def landing(request):
    return render(request, "core/landing.html")

def communication(request):
    return render(request, "core/communication.html")

def login(request):
    return render(request, "core/login.html")

def registration(request):
    return render(request, "core/registration.html")

@api_view(["POST"])
def create_ping(request):
    ping = Ping.objects.create()
    return Response(PingSerializer(ping).data)

@api_view(["GET"])
def health(request):
    return Response({"ok": True})


@api_view(["POST"])
def enqueue_ping(request):
    job = create_ping_task.delay()
    return Response({"task_id": job.id})
