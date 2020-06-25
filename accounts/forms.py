from django import forms
from django.db import models
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User

class SignupForm(UserCreationForm):
    email = forms.EmailField()
    phone = forms.IntegerField()
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'phone',
            'password1',
            'password2'
        ]
