from django.urls import path
from .views import DocumentListCreateView, DocumentRetrieveUpdateDestroyView

urlpatterns = [
    path('', DocumentListCreateView.as_view(), name='document-list-create'),
    path('<int:pk>/', DocumentRetrieveUpdateDestroyView.as_view(), name='document-detail'),
]
