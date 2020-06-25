from django.urls import path
from . import views

app_name = "home"
urlpatterns = [
    path("", views.practice, name="home"),
    path("practice", views.practice, name="practice"),
    path("friends", views.friends, name="friends"),
    path("online", views.online, name="online"),
    path("about", views.about, name="about")
]
