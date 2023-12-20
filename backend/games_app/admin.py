from django.contrib import admin
from .models import Game, GameResult

class GameResultInline(admin.StackedInline):
    model = GameResult
    extra = 1  # Number of empty GameResult forms to display

class GameAdmin(admin.ModelAdmin):
    inlines = [GameResultInline]

admin.site.register(Game, GameAdmin)
