from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from .models import Topic, Quiz
from .serializers import QuizSerializer, TopicSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse


class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
        })
    
class TopicsView(APIView):
    def get(self, request):
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)
    
class MergedQuizzesView(APIView):

    def get(self, request):
        topic_ids = request.query_params.getlist('topics')  
        if not topic_ids:
            return Response({"error": "Aucun topic sélectionné."}, status=status.HTTP_400_BAD_REQUEST)

        quizzes = Quiz.objects.filter(topic__id__in=topic_ids).order_by('?')  
        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error": "L'adresse e-mail et le mot de passe sont requis."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate_with_email(email, password)

        if user is not None:
            return Response(
                {"message": "Connexion réussie.", "user_id": user.id},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"error": "Adresse e-mail ou mot de passe incorrect."},
                status=status.HTTP_401_UNAUTHORIZED
            )
def authenticate_with_email(email, password):
    try:
        user = User.objects.get(email=email)
        if user.check_password(password):
            return user
    except User.DoesNotExist:
        return None

