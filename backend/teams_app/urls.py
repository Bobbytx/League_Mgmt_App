from django.urls import path
from .views import AddUserToTeamView, TeamPlayersView

urlpatterns = [
    path('AddUserToTeamView/', AddUserToTeamView.as_view(), name='AddUserToTeamView'),
    path('<int:team_id>/players', TeamPlayersView.as_view(), name='team-players'),
]

