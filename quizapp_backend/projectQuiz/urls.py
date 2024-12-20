from django.urls import path
from .views import MergedQuizzesView, LoginView, TopicsView, UserInfoView

urlpatterns = [
    path('api/quizzes/merged/', MergedQuizzesView.as_view(), name='merged-quizzes'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/topics/', TopicsView.as_view(), name='topics'),
    path('api/user-info/', UserInfoView.as_view(), name='user-info'),
]
