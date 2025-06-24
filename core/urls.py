from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("get_started", views.get_started, name="get_started"),
    path("learn_more", views.learn_more, name="learn_more"),
    path("about_us", views.about_us, name="about_us"),
    path("legal", views.legal, name="legal"),
    path("contact", views.contact, name="contact"),
]
