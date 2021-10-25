from rest_framework import serializers
from django.contrib.auth.models import User
from Acciones.models import Lead, Api, HistorialOrdenes

class UserSerializer(serializers.Serializer): 
    id = serializers.ReadOnlyField()
    first_name = serializers.CharField() 
    last_name = serializers.CharField() 
    username = serializers.CharField() 
    email = serializers.EmailField()
    password = serializers.CharField() 

    def create(selt, validate_data):
        instance = User()
        instance.first_name = validate_data.get('first_name')
        instance.last_name = validate_data.get('last_name')
        instance.username = validate_data.get('username')
        instance.email = validate_data.get('email')
        instance.set_password(validate_data.get('password'))
        instance.save()
        return instance

    def validate_username(selt, data):
        users = User.objects.filter(username = data)
        if len(users) != 0: 
            raise serializers.ValidationError("Este nombre de usuario ya está registrado")
        else:
            return data


class LeadSerializer(serializers.ModelSerializer):
  class Meta:
    model = Lead 
    fields = '__all__'


class ApiSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Api
        fields = '__all__'


class ApiSerializerUser(serializers.ModelSerializer):
    class Meta: 
        model = Api
        fields = ('id','User')

class HistorialOrdenesSerializer(serializers.ModelSerializer):
    Api = ApiSerializerUser(read_only=False)
    class Meta: 
        model = HistorialOrdenes
        fields = '__all__'