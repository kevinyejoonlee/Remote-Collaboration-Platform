from django.urls import path
from .consumers import VideoCallConsumer, DocumentConsumer

websocket_urlpatterns = [
    path('ws/document/', DocumentConsumer.as_asgi()),
]
