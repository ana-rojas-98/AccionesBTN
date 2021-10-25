
from Acciones.models import Lead
from rest_framework.response import Response
from .serializers import UserSerializer, LeadSerializer, ApiSerializer, HistorialOrdenesSerializer
from .models import HistorialOrdenes, Api
from rest_framework.views import APIView
from rest_framework import status, viewsets, permissions
import numpy as np
import json
from websocket import create_connection
import asyncio


class UserAPI(APIView):
    def post(self, request): 
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        else: 
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)



class LeadViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = LeadSerializer

    def get_queryset(self):
        return self.request.user.leads.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    



class ApiLeadViewSet(viewsets.ModelViewSet): 
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = ApiSerializer

    def get_queryset(self):
        return self.request.user.Apis.all()

    def perform_create(self, serializer):
        serializer.save(User=self.request.user)



class HistorialOrdenesViewSet(viewsets.ModelViewSet): 
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = HistorialOrdenesSerializer
    queryset = HistorialOrdenes.objects.all()

    def get_queryset(self):
        return self.queryset.filter(Api__User=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(User=self.request.user)

    

 




    


    

        
    

   
    
    
