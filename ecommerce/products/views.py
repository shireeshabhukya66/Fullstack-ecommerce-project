from django.shortcuts import render
from .models import Product
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def products_list(request):

    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)



@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def product_detail(request, id):

    try:
        product = Product.objects.get(id=id)

    except:
        return Response({"error": "Not found"})


    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)


    if request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)


    if request.method == 'DELETE':
        product.delete()
        return Response({"message": "Deleted"})
    


@api_view(['POST'])
def register_user(request):

    data = request.data

    user = User.objects.create(
        username=data['username'],
        email=data['email'],
        password=make_password(data['password'])
    )

    return Response({
        "message": "User created successfully"
    })

