from django.contrib import admin
from .models import TeamMembership

class TeamMembershipAdmin(admin.ModelAdmin):
    list_display = ('player', 'team', 'role')
    list_filter = ('team', 'role')
    search_fields = ('player__username', 'team__team_name', 'role')

admin.site.register(TeamMembership, TeamMembershipAdmin)
