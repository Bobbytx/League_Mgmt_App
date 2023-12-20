from rest_framework import serializers
from .models import TeamMembership, Team

class TeamMembershipSerializer(serializers.ModelSerializer):
    player_name = serializers.SerializerMethodField()

    class Meta:
        model = TeamMembership
        fields = ['player_name', 'position', 'role']

    def get_player_name(self, obj):
        return f"{obj.player.first_name} {obj.player.last_name}"

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['team_name']
