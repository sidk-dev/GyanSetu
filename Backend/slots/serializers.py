from rest_framework import serializers
from .models import Slot

class SlotsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        exclude = ["for_user"]

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        exclude = ["for_user"]
        read_only_fields = ['created_at']

    def validate(self, attrs):
        start_time = attrs.get('start_time')
        end_time = attrs.get('end_time')
        if start_time and end_time and end_time <= start_time:
            raise serializers.ValidationError("End time must be after start time.")
        return attrs