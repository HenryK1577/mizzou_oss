from django.urls import path
from . import views

app_name = "core"

urlpatterns = [
    path("", views.landing, name="landing"),
    path("communication/", views.communication, name="communication"),
    path("login/", views.login, name="login"),
    path("registration/", views.registration, name="registration")
]