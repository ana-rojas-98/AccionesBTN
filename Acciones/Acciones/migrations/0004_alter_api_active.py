# Generated by Django 3.2.6 on 2021-08-18 21:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Acciones', '0003_api'),
    ]

    operations = [
        migrations.AlterField(
            model_name='api',
            name='active',
            field=models.BooleanField(default=False),
        ),
    ]
