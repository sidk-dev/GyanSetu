from accounts.utils.password_reset_email import send_password_reset_email
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Skill, User
from .serializers import ChangePasswordSerializer, UserSerializer, validate_password_rules
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework import status

# Email System
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        token = Token.objects.create(user=serializer.instance)
        return Response({
            "token": token.key,
            "data": serializer.data
        })
    return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    data = request.data

    try:
        user = User.objects.get(email=data.get("email"))
    except User.DoesNotExist:
        return Response({
            "error": "User does not exist."
        }, status=status.HTTP_404_NOT_FOUND)
    
    if not user.check_password(data.get("password")):
        return Response({
            "error": "User does not exist."
        }, status=status.HTTP_404_NOT_FOUND)
    
    token, created = Token.objects.get_or_create(user=user)
    return Response({"token": token.key})


@api_view(['POST'])
def change_password(request):
    user = request.user
    data = request.data
    serializer = ChangePasswordSerializer(data=data, context={"user": user})
    if serializer.is_valid():
        # Delete old token.
        Token.objects.filter(user=request.user).delete()

        # Update user's password.
        user.set_password(serializer.validated_data['new_password'])
        user.save()

        # Regenerate token.
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})

    return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password(request):
    data = request.data
    email=data.get("email")

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({
            "error": "User does not exist."
        }, status=status.HTTP_404_NOT_FOUND)
    
    token = PasswordResetTokenGenerator().make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    reset_link = f"http://localhost:8000/api/accounts/reset-password/{uid}/{token}/"
    # Send Email
    send_password_reset_email(
        "Reset your password",
        f"Click the link to reset your password:\n{reset_link}",
        email,
    )

    return Response({"message": "Check you inbox."})


@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request, uidb64, token):
    # Access From mail.
    password = request.data.get("password")
    if not password:
        return Response({"error": "Please enter the new password."})

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid) # django ORM automatically converts string "uid" to integer.
    except Exception:
        return Response({"error": "Invalid link"}, status=400)

    if not PasswordResetTokenGenerator().check_token(user, token):
        return Response({"error": "Token expired or invalid"}, status=400)

    validate_password_rules(password)
    user.set_password(password)
    user.save()

    return Response({"message": "Password reset successful"})


@api_view(['GET', 'PATCH'])
def account(request):
    if request.method == "GET":
        id = request.GET.get("id", None)
        if id: 
            try:
                user = User.objects.get(id=id)
            except User.DoesNotExist:
                return Response({
                    "error": "User does not exist."
                }, status=status.HTTP_404_NOT_FOUND)
        else:
            user = request.user
        
        serializer = UserSerializer(user, context={"is_owner": user.id == request.user.id})
        return Response({
            "data": serializer.data
        })
    else:
        user = request.user
        data = request.data
        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)
    