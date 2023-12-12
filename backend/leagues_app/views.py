from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import League
from .serializers import League_serializer

class Create_league(APIView):
    def post(self, request, format=None):
        serializer = League_serializer(data=request.data)

        if serializer.is_valid():
            # Create the league and set the commissioner to the current user
            league = serializer.save(commissioner=request.user)
            return Response({'message': 'League created successfully', 'league_id': league.id}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
