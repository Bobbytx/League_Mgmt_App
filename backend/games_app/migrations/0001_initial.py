# Generated by Django 5.0 on 2023-12-12 03:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('leagues_app', '0001_initial'),
        ('teams_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('game_date', models.DateTimeField()),
                ('location', models.CharField(max_length=255)),
                ('away_team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='away_games', to='teams_app.team')),
                ('home_team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='home_games', to='teams_app.team')),
                ('league', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='games', to='leagues_app.league')),
            ],
        ),
        migrations.CreateModel(
            name='GameResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('home_team_score', models.IntegerField(default=0)),
                ('away_team_score', models.IntegerField(default=0)),
                ('game', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='result', to='games_app.game')),
            ],
        ),
    ]
