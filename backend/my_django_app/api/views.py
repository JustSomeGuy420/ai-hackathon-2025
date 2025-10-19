import requests
import xml.etree.ElementTree as ET
from django.http import JsonResponse

# Create your views here.

def get_product_count(request):
    """
    Returns the number of products tracked in the UNCTAD TRAINS dataset.
    """
    url = "https://wits.worldbank.org/API/V1/wits/datasource/trn/product/ALL"

    try:
        # Fetch data from WITS API
        response = requests.get(url, timeout=20)
        response.raise_for_status()

        # return response
        # Parse XML response
        root = ET.fromstring(response.content)

        # Try to find product entries (adjust tag name as needed)
        namespaces = {'wits': root.tag.split('}')[0].strip('{')} if '}' in root.tag else {}

        if namespaces:
            products = root.findall(".//wits:product", namespaces)
        else:
            products = root.findall(".//product")

        # Count them
        product_count = len(products)

        return JsonResponse({
            "dataset": "UNCTAD TRAINS",
            "product_count": product_count,
            "namespace_used": bool(namespaces)
        })

    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)
    except ET.ParseError as e:
        return JsonResponse({"error": f"XML parse error: {str(e)}"}, status=500)
