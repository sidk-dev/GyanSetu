from django.db import models
from django.conf import settings

class Skill(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    skill_text = models.CharField(max_length=350)
    created_at = models.DateTimeField('Creation Date/Time', auto_now_add=True)

    def __str__(self):
        return f"{self.id}: {self.skill_text}"

