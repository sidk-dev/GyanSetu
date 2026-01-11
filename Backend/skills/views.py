from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework import status

from skills.serializers import SkillSerializer
from .models import Skill

@api_view(['POST', 'DELETE'])
def edit_skill(request):
    if request.method == "POST":
        data = request.data
        try:
            Skill.objects.create(user=request.user, skill_text=data['skill_text'])
            return Response({
                "message": "Skill added"
            })
        except:
            return Response({
                "message": "Can't add skill. Something went wrong."
            },status=404)
    else:
        data = request.data
        try:
            Skill.objects.get(user=request.user, id=data['id']).delete()
            return Response({
                "message": "Skill deleted"
            })
        except:
            return Response({
                "message": "Can't delete skill. Something went wrong."
            },status=404)


@api_view(['GET'])
def skills(request):
    if request.GET.get("is_dashboard"):
        # ['City A', 'City B', ...]
        values = Skill.objects.filter(
            user__district=request.user.district
        ).values_list("skill_text", flat=True).distinct()[:5]
        return Response(values)
    else:
        skills = Skill.objects.filter(user=request.user)
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data)