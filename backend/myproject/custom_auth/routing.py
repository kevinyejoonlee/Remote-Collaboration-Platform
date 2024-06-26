from django.urls import path
from custom_auth.consumers import DocumentConsumer

websocket_urlpatterns = [
    path('ws/document/', DocumentConsumer.as_asgi()),
]
