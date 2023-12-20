from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_500_INTERNAL_SERVER_ERROR,
)
from django.db.models import Q
from .models import Game
from .serializers import GameSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Game
from teams_app.models import TeamMembership
from django.shortcuts import get_object_or_404


class TeamGamesView(APIView):
    def get(self, request, team_id):
        try:
            games = Game.objects.filter(
                Q(home_team__id=team_id) | Q(away_team__id=team_id)
            )
            serializer = GameSerializer(games, many=True)
            return Response(serializer.data, status=HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'An error occurred'}, status=HTTP_500_INTERNAL_SERVER_ERROR)

class EditGameScheduleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, game_id):
        game = get_object_or_404(Game, id=game_id)
        user = request.user

        # Check if the user is a coach of either team in the game
        if not TeamMembership.objects.filter(player=user, team__in=[game.home_team, game.away_team], role='coach').exists():
            return Response({'error': 'You are not authorized to edit this game'}, status=status.HTTP_403_FORBIDDEN)

        # Update game details (example: date and location)
        game.game_date = request.data.get('game_date', game.game_date)
        game.location = request.data.get('location', game.location)
        game.save()

        return Response({'message': 'Game schedule updated successfully'}, status=status.HTTP_200_OK)
    
class DeleteGameScheduleView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, game_id):
        game = get_object_or_404(Game, id=game_id)
        user = request.user

        # Check if the user is a coach of either team in the game
        if not TeamMembership.objects.filter(player=user, team__in=[game.home_team, game.away_team], role='coach').exists():
            return Response({'error': 'You are not authorized to edit this game'}, status=status.HTTP_403_FORBIDDEN)

        game.delete()

        return Response({'message': 'Game deleted successfully'}, status=status.HTTP_200_OK)


class AddGameScheduleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        # Attempt to find the user's team and corresponding league
        team_membership = TeamMembership.objects.filter(player=user, role='coach').first()
        if not team_membership:
            return Response({'error': 'You are not a coach of any team'}, status=status.HTTP_403_FORBIDDEN)

        # Create a modified request data with the league set to the user's team league
        modified_data = request.data.copy()
        modified_data['league'] = team_membership.team.league.id

        serializer = GameSerializer(data=modified_data)
        if serializer.is_valid():
            # Save the new game
            serializer.save()
            return Response({'message': 'Game added successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AllGamesView(APIView):
    def get(self, request):
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        return JsonResponse(serializer.data, safe=False)