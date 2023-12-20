from rest_framework import serializers
from .models import UserProfile, CustomUser
from teams_app.serializers import TeamSerializer
from teams_app.models import TeamMembership

class UserProfileSerializer(serializers.ModelSerializer):
    team_info = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['bio', 'team_info']

    def get_team_info(self, obj):
        team_membership = TeamMembership.objects.filter(player=obj.user).first()
        if team_membership:
            team = team_membership.team
            team_serializer = TeamSerializer(team)
            return team_serializer.data
        return None
