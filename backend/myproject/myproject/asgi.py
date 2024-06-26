import os
import django
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from custom_auth.middleware import TokenAuthMiddleware
import custom_auth.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

# Initialize Django
django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": TokenAuthMiddleware(
        AuthMiddlewareStack(
            URLRouter(
                custom_auth.routing.websocket_urlpatterns
            )
        )
    ),
})
