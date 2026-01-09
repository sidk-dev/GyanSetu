from rest_framework import serializers
from datetime import date
from .models import User


def validate_password_rules(password):
    if len(password) > 128:
        raise serializers.ValidationError("Password must be less than 128 characters.")
    if len(password) < 6:
        raise serializers.ValidationError("Password must be at least 6 characters long.")
    if password.isdigit():
        raise serializers.ValidationError("Your password cannot be completely numeric. Please make it stronger.")
    return password


class UserSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField()
    password = serializers.CharField(
        write_only=True, 
        required=True,  # required for POST & PUT, but - PATCH (with partial=True) not required.
        error_messages={
            'required': "Please provide your account password.",
            'invalid': "Please provide a valid password."
        },
    )

    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'email', 
            'gender', 
            'credits', 
            'bio', 
            'region',
            'district',
            'age',
            'password'
        ]

    def get_age(self, obj):
        if not obj.date_of_birth:
            # if date_of_birth is null in database
            return None

        today = date.today()
        return (
            today.year - obj.date_of_birth.year - 
            ((today.month, today.day) < (obj.date_of_birth.month, obj.date_of_birth.day))
        )
    
    def validate_password(self, password):
        return validate_password_rules(password)

    def to_representation(self, instance):
        data = super().to_representation(instance)

        # It will remove the credits field if the account requester is not the owner.
        if not self.context.get("is_owner"):
            data.pop("credits", None)

        return data
    
    # By default serializers do not check for unknown fields, below we validated for them.
    def validate(self, attrs):
        for field in self.initial_data:
            if field not in self.fields:
                raise serializers.ValidationError({field: "This field is not allowed."})
        return attrs
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        for attribute, value in validated_data.items():
            # instance.attribute = value
            setattr(instance, attribute, value)

        if password:
            instance.set_password(password)
        instance.save()
        return instance


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(
        write_only=True, required=True, min_length=6
    )
    new_password = serializers.CharField(
        write_only=True, required=True, min_length=6
    )

    def validate_new_password(self, new_password):
        return validate_password_rules(new_password)

    def validate(self, data):
        user = self.context['user']
        old_password = data.get('old_password')

        if not user.check_password(old_password):
            raise serializers.ValidationError({"old_password": "Old password is incorrect."})

        return data
