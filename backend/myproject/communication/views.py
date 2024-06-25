from django.shortcuts import render

# Create your views here.
from django.views import View
from django.http import HttpResponse

class ChatView(View):
    def get(self, request):
        return HttpResponse('Chat view')
