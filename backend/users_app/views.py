from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from .models import CustomUser  
from teams_app.models import TeamMembership
from teams_app.serializers import TeamSerializer
from rest_framework import status



class UserTeamView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            team_membership = TeamMembership.objects.filter(player=request.user).first()
            if team_membership:
                team_serializer = TeamSerializer(team_membership.team)  # Define team_serializer here
                return Response({
                    'teamId': team_membership.team.id,
                    'teamName': team_serializer.data['team_name']  # Now you can access team_serializer.data
                })
            else:
                return Response({'error': 'User is not part of any team'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Sign_up(APIView):
    def post(self, request):
        data = request.data
        data["username"] = request.data.get("email")
        new_user = CustomUser.objects.create_user(**data) 
        if new_user is not None:
            new_token = Token.objects.create(user=new_user)
            login(request, new_user)
            return Response(
                {"user": new_user.display_name, "token": new_token.key},
                status=HTTP_201_CREATED,
            )
        return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
    
class Log_in(APIView):
    def post(self, request):
        data = request.data.copy()
        user = authenticate(username=data.get("email"), password=data.get("password"))
        if user is not None:
            token, created = Token.objects.get_or_create(user=user) 
            login(request, user)
            return Response({"user": user.display_name, "token": token.key})
        return Response("Improper Credentials", status=HTTP_404_NOT_FOUND)

class UserPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class UserInfoView(UserPermissions):
    # ... authentication and permission classes ...

    def get(self, request):
        user = request.user
        user_data = {
            'email': user.email,
            'display_name': user.display_name,
            # ... other user fields ...
        }

        # Check if the user is a coach and include it in the response
        membership = TeamMembership.objects.filter(player=user).first()
        if membership:
            user_data['role'] = membership.role
        else:
            user_data['role'] = None

        return Response(user_data)

class Log_out(UserPermissions):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)
