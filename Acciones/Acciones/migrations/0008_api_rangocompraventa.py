# Generated by Django 3.2.6 on 2021-09-23 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Acciones', '0007_historialordenes'),
    ]

    operations = [
        migrations.AddField(
            model_name='api',
            name='rangoCompraVenta',
            field=models.FloatField(default=500),
        ),
    ]
