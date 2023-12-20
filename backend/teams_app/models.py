from django.db import models
from django.conf import settings
from leagues_app.models import League

class Team(models.Model):
    team_name = models.CharField(max_length=255)
    coach = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='coached_teams')
    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name='teams')

    def __str__(self):
        return self.team_name

    def calculate_win_loss_record(self):
        wins = 0
        losses = 0

        # Access games associated with this team as home or away
        home_games = self.home_games.all()
        away_games = self.away_games.all()

        for game in home_games:
            if game.result:
                if game.result.winner == self:
                    wins += 1
                else:
                    losses += 1

        for game in away_games:
            if game.result:
                if game.result.winner == self:
                    wins += 1
                else:
                    losses += 1

        return wins, losses

class TeamMembership(models.Model):
    player = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='team_memberships')
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='members')
    position = models.CharField(max_length=100, blank=True, null=True)
    ROLE_CHOICES = [
        ('coach', 'Coach'),
        ('assistant_coach', 'Assistant Coach'),
        ('player', 'Player'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='player')