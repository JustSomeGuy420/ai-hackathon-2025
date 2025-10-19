from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import requests

def apitest(request):
    try:
        response = requests.get('https://wits.worldbank.org/API/V1/SDMX/V21/datasource/TRN/reporter/840/partner/000/product/020110/year/2000/datatype/reported?format=JSON')
        response.raise_for_status()  # Raise an exception for HTTP errors
        data = response.json()
        return JsonResponse(data)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)