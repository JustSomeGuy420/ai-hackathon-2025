from django.urls import path
from .views import get_product_count

urlpatterns = [
    path('api/product_count/', get_product_count, name='get_product_count'),
]