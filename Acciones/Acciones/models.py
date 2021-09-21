from django.db import models
from django.contrib.auth.models import User


class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=500, blank=True)
    owner = models.ForeignKey(
        User, related_name="leads", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Api(models.Model):
    api = models.CharField(max_length=500, unique=True)
    SecretKey = models.CharField(max_length=500, default="")
    active = models.BooleanField(default=False)
    valueBTC = models.FloatField(default=50000)
    valorArriba = models.FloatField(default=50000)
    valorAbajo = models.FloatField(default=50000)
    porcentaje = models.FloatField(default=20)
    User = models.ForeignKey(
        User, related_name="Apis", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class HistorialOrdenes(models.Model):
    tipo = models.CharField(max_length=500)
    resultado = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    Api = models.ForeignKey(
        Api, related_name="Historial", on_delete=models.CASCADE, null=True)

# Create your models here.
