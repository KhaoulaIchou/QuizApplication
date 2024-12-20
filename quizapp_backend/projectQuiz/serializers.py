from rest_framework import serializers
from .models import Topic, Quiz

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'question', 'option_a', 'option_b', 'option_c', 'option_d']

class TopicSerializer(serializers.ModelSerializer):
    quizzes = QuizSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = ['id', 'name', 'description', 'quizzes']
