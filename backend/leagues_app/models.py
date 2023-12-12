from django.db import models

from django.conf import settings

class League(models.Model):
    league_name = models.CharField(max_length=200)
    commissioner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='leagues')
    sport_type = models.CharField(max_length=100)
    description = models.TextField(blank=True, max_length=500)
    team_count = models.IntegerField(default=0)

    def __str__(self):
        return self.league_name