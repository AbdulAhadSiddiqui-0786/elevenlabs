from rest_framework import serializers
from .models import AudioLanguage

class AudioLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioLanguage
        fields = ['code', 'name', 'flag_code', 'audio_url']