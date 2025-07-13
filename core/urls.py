from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("get_started", views.get_started, name="get_started"),
    path("learn_more", views.learn_more, name="learn_more"),
    path("about_us", views.about_us, name="about_us"),
    path("researchers", views.researchers, name="researchers"),
    path("legal", views.legal, name="legal"),
    path("contact", views.contact, name="contact"),
    path("donate", views.donate, name="donate"),
    path("articles", views.articles, name="articles"),
]
