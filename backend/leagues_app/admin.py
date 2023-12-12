from django.contrib import admin
from .models import League
from teams_app.models import Team

class Team_in_line(admin.TabularInline): 
    model = Team
    extra = 1 

@admin.register(League)
class League_admin(admin.ModelAdmin):
    inlines = [Team_in_line]