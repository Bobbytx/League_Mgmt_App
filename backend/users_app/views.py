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

class Info(UserPermissions):
    def get(self, request):
        return Response({"user": request.user.display_name})

class Log_out(UserPermissions):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)



# from django.contrib.auth import authenticate
# from .models import CustomUser
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.status import (
#     HTTP_201_CREATED,
#     HTTP_404_NOT_FOUND,
#     HTTP_204_NO_CONTENT,
# )
# from rest_framework.authtoken.models import Token
# from rest_framework.authentication import TokenAuthentication
# from rest_framework.permissions import IsAuthenticated


# class Sign_up(APIView):
#     def post(self, request):
#         '''data = request.data
#         data['username'] = request.data.get['email']
#         new_user = User.objects.create_user(**data)
#         if new_user is not None:
#             new_token = Token.objects.create4(user=new_user)
#             return Response(
#                 {'user': new_user.display_name, 'token': new_token.key}, status=HTTP_201_CREATED
#             )
#         return Response('Something went wrong', status=HTTP_400_BAD_REQUEST)

#             '''
#         request.data['username'] = request.data['email']
#         user = CustomUser.objects.create_user(**request.data)
#         token = Token.objects.create(user=user)
#         return Response({'user': user.email, 'token': token.key}, status=HTTP_201_CREATED)
    
# class Log_in(APIView):
#     def post(self, request):
#         user = authenticate(email=request.data['email'], password=request.data['password'])
#         if user:
#             token = Token.objects.get(user=user)
#             return Response({'user': user.email, 'token': token.key}, status=HTTP_201_CREATED)
#         else:
#             return Response({'error': 'Wrong credentials'}, status=HTTP_404_NOT_FOUND)
        
# class Log_out(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]
    
#     def post(self, request):
#         request.user.auth_token.delete()
#         return Response(status=HTTP_204_NO_CONTENT)