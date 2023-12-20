from django.urls import path
from .views import TeamGamesView, AllGamesView, EditGameScheduleView, DeleteGameScheduleView, AddGameScheduleView

urlpatterns = [
    path('team-games/<int:team_id>/', TeamGamesView.as_view(), name='team-games'),
    path('all-games/', AllGamesView.as_view(), name='all-games'),
    path('edit-game/<int:game_id>/', EditGameScheduleView.as_view(), name='edit-game'),
    path('delete-game/<int:game_id>/', DeleteGameScheduleView.as_view(), name='delete-game'),
    path('add-game/', AddGameScheduleView.as_view(), name='add-game'),
]
