from django.urls import path
from . import views

urlpatterns = [
    path('audio/', views.audio_list, name='audio-list'),
    path('audio/add/', views.add_audio, name='add-audio'),
]