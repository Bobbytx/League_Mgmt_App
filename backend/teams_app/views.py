from django.shortcuts import render

from rest_framework import generics
from .models import Team
from .serializers import TeamSerializer

class Team_list_create_view(generics.ListCreateAPIView):
    serializer_class = TeamSerializer

    def get_queryset(self):
        """
        Returns a list of all teams for the league as determined by the league_id part of the URL.
        """
        league_id = self.kwargs['league_id']
        return Team.objects.filter(league=league_id)
