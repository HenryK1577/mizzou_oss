from celery import shared_task
from .models import Ping

@shared_task
def create_ping_task():
    p = Ping.objects.create()
    return p.id
