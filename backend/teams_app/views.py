# teams_app/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TeamMembership, Team
from django.contrib.auth import get_user_model
from .serializers import TeamMembershipSerializer
from rest_framework.permissions import IsAuthenticated

class AddUserToTeamView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.data.get('user_id')
        team_id = request.data.get('team_id')
        role = request.data.get('role', 'player') 

        try:
            user = get_user_model().objects.get(id=user_id)
            team = Team.objects.get(id=team_id)
            TeamMembership.objects.create(player=user, team=team, role=role)
            return Response({'message': 'User added to team'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class TeamPlayersView(APIView):
    def get(self, request, team_id):
        team_members = TeamMembership.objects.filter(team__id=team_id)
        serializer = TeamMembershipSerializer(team_members, many=True)
        return Response(serializer.data)