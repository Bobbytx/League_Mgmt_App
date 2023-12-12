from django.urls import path
from .views import Create_league

urlpatterns = [
    path('create_league/', Create_league.as_view(), name='create_league'),
]

