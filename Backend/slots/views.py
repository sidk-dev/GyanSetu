from django.core.serializers import serialize
from django.db import transaction
from django.db.models import F, Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.conf import settings

from skills.models import Skill
from accounts.models import User
from slots.pagination import SlotCursorPagination
from slots.serializers import SlotSerializer, SlotsSerializer
from .models import Slot

@api_view(['GET', 'POST'])
def slots(request):
    if request.method == "GET":
        if request.GET.get("is_profile") == "true":
            id = request.GET.get("id", None)
            if id: 
                try:
                    user = User.objects.get(id=id)
                except User.DoesNotExist:
                    return Response({
                        "message": "User does not exist."
                    }, status=status.HTTP_404_NOT_FOUND)
            else:
                user = request.user

            slots = Slot.objects.filter(user=user)
        else:
            skill_texts = Skill.objects.filter(
                user=request.user
            ).values_list("skill_text", flat=True)

            slots = Slot.objects.filter(
                for_user__isnull=True
            ).exclude(
                Q(user=request.user) | Q(skill_text__in=skill_texts)
            )
        
        paginator = SlotCursorPagination()
        page = paginator.paginate_queryset(slots, request)

        serializer = SlotsSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    else:
        # {
        #     "id": 1,
        #     "skill_text": "Python",
        #     "description": "Quick tutoring session",
        #     "start_time": "2026-01-12T15:30:00+05:30",
        #     "end_time": "2026-01-12T16:30:00+05:30",
        #     "created_at": "2026-01-11T17:21:48.241290+05:30",
        #     "user": 5
        # }
        data = request.data
        serializer = SlotSerializer(data={"user": request.user.id, **data})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=404)

@api_view(['POST'])
def book_slot(request, id):
    try:
        # Lock the slot to prevent race conditions
        slot = Slot.objects.select_for_update().get(id=id)
    except Slot.DoesNotExist:
        return Response({"message": "Slot does not exist."}, status=404)
    
    if slot.user == request.user:
        return Response({"message": "You can't book your own slot."}, status=400)
    
    if slot.for_user:
        return Response({"message": "Slot is already booked."}, status=400)
    
    # Check if the booking user has enough credits
    if request.user.credits < settings.SLOT_CREDIT_COST:
        return Response({"message": "Insufficient credits to book this slot."}, status=400)
    
    with transaction.atomic():
        slot.for_user = request.user
        slot.save(update_fields=['for_user'])

        # Add credits to slot owner
        slot.user.credits = F('credits') + settings.SLOT_CREDIT_COST
        slot.user.save(update_fields=['credits'])

        # Deduct credits from ,booking user
        request.user.credits = F('credits') - settings.SLOT_CREDIT_COST
        request.user.save(update_fields=['credits'])

    return Response({"message": "Slot booked successfully."}, status=200)


@api_view(['DELETE'])
def delete_slot(request, id):
    try:
        slot = Slot.objects.get(id=id)
    except Slot.DoesNotExist:
        return Response({
            "message": "Slot does not exist."
        }, status=404)
    
    if slot.user != request.user:
        return Response({
            "message": "You can't delete this slot."
        }, status=404)

    slot.delete()
    return Response({"message": "Slot deleted."}, status=404)