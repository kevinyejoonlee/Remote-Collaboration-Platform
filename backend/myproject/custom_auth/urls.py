from django.urls import path
from .views import MyTokenObtainPairView, RegisterView, UserListView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('signup/', RegisterView.as_view(), name='auth_register'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', UserListView.as_view(), name='user_list'),
]
