# custom_auth/middleware.py
from urllib.parse import parse_qs
from channels.middleware.base import BaseMiddleware
from channels.db import database_sync_to_async
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import AnonymousUser, User

@database_sync_to_async
def get_user(token_key):
    try:
        token = AccessToken(token_key)
        user = User.objects.get(id=token['user_id'])
        return user
    except Exception:
        return AnonymousUser()

class TokenAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query_string = parse_qs(scope["query_string"].decode())
        token_key = query_string.get("token")
        if token_key:
            scope["user"] = await get_user(token_key[0])
        else:
            scope["user"] = AnonymousUser()
        return await super().__call__(scope, receive, send)
