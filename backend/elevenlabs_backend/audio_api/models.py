from django.db import models

# This model is just for reference, we'll use direct MongoDB access for data operations
class AudioLanguage(models.Model):
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    flag_code = models.CharField(max_length=10)
    audio_url = models.URLField()
    
    class Meta:
        db_table = 'audio_languages'
    
    def __str__(self):
        return self.name