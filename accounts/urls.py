from django.urls import path
from . import views

app_name = "accounts"
urlpatterns = [
    path("login", views.loginuser, name="loginuser"),
    path("logout", views.logoutuser, name="logoutuser"),
    path("signup", views.signupuser, name="signupuser"),
    #path("signup/email_verification", views.email_verification, name="email_verification"),
    #path("signup/ph_verification", views.ph_verification, name="ph_verification"),
]
