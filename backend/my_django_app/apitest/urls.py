from django.urls import path
from . import views

urlpatterns = [
    path('apitest/', views.apitest, name='apitest'),
]
