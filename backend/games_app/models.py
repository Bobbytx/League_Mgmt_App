from django.db import models
from teams_app.models import Team
from leagues_app.models import League

class Game(models.Model):
    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name='games')
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_games')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_games')
    game_date = models.DateTimeField()
    location = models.CharField(max_length=255)

class GameResult(models.Model):
    game = models.OneToOneField(Game, on_delete=models.CASCADE, related_name='result')
    home_team_score = models.IntegerField(default=0)
    away_team_score = models.IntegerField(default=0)

    @property
    def result(self):
        if self.home_team_score > self.away_team_score:
            return "Home Team Wins"
        elif self.home_team_score < self.away_team_score:
            return "Away Team Wins"
        else:
            return "Draw"