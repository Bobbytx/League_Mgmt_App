from rest_framework import serializers
from .models import Game
from teams_app.models import Team

class GameSerializer(serializers.ModelSerializer):
    home_team = serializers.SlugRelatedField(
        slug_field='team_name',
        queryset=Team.objects.all()
    )
    away_team = serializers.SlugRelatedField(
        slug_field='team_name',
        queryset=Team.objects.all()
    )

    class Meta:
        model = Game
        fields = ['id', 'league', 'home_team', 'away_team', 'game_date', 'location']




# class TeamSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Team
#         fields = ['team_name'] 

# class GameSerializer(serializers.ModelSerializer):
#     home_team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())
#     away_team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())


#     class Meta:
#         model = Game
#         fields = ['id', 'league', 'home_team', 'away_team', 'game_date', 'location']
