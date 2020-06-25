from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse

from .forms import SignupForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User

from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required


# Create your views here.

def loginuser(request):
    if request.method == 'POST':
        user = authenticate(
            request, username=request.POST["username"], password=request.POST["password"])
        form = AuthenticationForm(request.POST)
        if user is not None:
            login(request, user)
        else:
            return render(request, 'accounts/loginuser.html', {
                'form': form,
                'error': "Invalid credentials"
            })
        return HttpResponseRedirect(reverse('home:home'))
    else:
        form = AuthenticationForm()
        return render(request, "accounts/loginuser.html", {
            'form': form
        })


def signupuser(request):
    if request.method == "POST":
        form = SignupForm(request.POST)
        email = request.POST['email']
        if form.is_valid():
            if User.objects.filter(email=email).exists():
                 return render(request, 'accounts/signupuser.html', {
                     'form': form,
                     'error': "Email already exists"
                 })
            else:
                user = User.objects.create_user(request.POST['username'], password=request.POST['password1'])
                user.save()
                login(request, user)
        else:
            return render(request, 'accounts/signupuser.html', {
                'form': form
            })
        return redirect('/')

    else:
        form = SignupForm()

    return render(request, 'accounts/signupuser.html', {
        'form': form
    })


def email_verification(request):
    return render(request, "accounts/email_verification.html")


def ph_verification(request):
    return render(request, "accounts/ph_verification.html")

def logoutuser(request) :
    if request.method == "POST":
        logout(request)
        return redirect('home:practice')
