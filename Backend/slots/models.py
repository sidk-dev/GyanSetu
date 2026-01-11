from django.db import models
from django.conf import settings

class Slot(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name="slots_created"
    )
    for_user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name="slots_booked",
        null=True,
        blank=True
    )
    skill_text = models.CharField(max_length=350)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id}: {self.skill_text} ({self.start_time} - {self.end_time})"
