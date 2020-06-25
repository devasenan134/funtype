from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import Quote
from django.contrib.auth.models import User

# Create your views here.
def home(request):
    return render(request, "home/home.html")

def practice(request):
    return render(request, "home/practice.html")

def friends(request):
    return render(request, "home/friends.html")


def online(request):
    return render(request, "home/online.html")


def about(request):
    return render(request, "home/about.html")
