from django.urls import path
from .views import Team_list_create_view

urlpatterns = [
    path('leagues/<int:league_id>/teams/', Team_list_create_view.as_view(), name='league-teams'),
]
