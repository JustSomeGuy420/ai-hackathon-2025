from rest_framework import generics
from .serializers import UserSerializer
from django.contrib.auth.models import User

# This view handles POST requests to register a new user
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
# Create your views here.
