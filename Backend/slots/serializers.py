from rest_framework import serializers

from accounts.models import User
from .models import Slot

class UserSerializerForSkill(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id',  'first_name', 'last_name']

class SlotsSerializer(serializers.ModelSerializer):
    user = UserSerializerForSkill()

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