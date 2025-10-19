from django.urls import path
from .views import RegisterView

urlpatterns = [
    # Maps POST requests to /api/register/ to our RegisterView
    path('register/', RegisterView.as_view(), name='register'),
]