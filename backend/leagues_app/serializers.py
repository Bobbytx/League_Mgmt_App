from rest_framework import serializers
from .models import League

class League_serializer(serializers.ModelSerializer):
    commissioner = serializers.ReadOnlyField(source='commissioner.id')

    class Meta:
        model = League
        fields = '__all__'