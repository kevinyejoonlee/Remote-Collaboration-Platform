from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/video-call/$', consumers.VideoCallConsumer.as_asgi()),
    re_path(r'ws/document/(?P<room_name>\w+)/$', consumers.DocumentConsumer.as_asgi()),
]
