from django.urls import path
from .views import Sign_up, Log_in, Log_out, UserTeamView, UserInfoView

urlpatterns = [
    path('signup/', Sign_up.as_view(), name='signup'),
    path('login/', Log_in.as_view(), name='login'),
    path('logout/', Log_out.as_view(), name='logout'),
    path('team/', UserTeamView.as_view(), name='user-team'),
    path('user-info/', UserInfoView.as_view(), name='user-info'),
] 