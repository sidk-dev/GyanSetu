from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework import status

from accounts.models import User
from skills.serializers import SkillSerializer
from .models import Skill

@api_view(['DELETE'])
def edit_skill(request, pk):
    Skill.objects.filter(user=request.user, id=pk).delete()
    return Response({"message": "Skill deleted"})


@api_view(['GET', 'POST'])
def skills(request):
    if request.method == "GET":
        # if request.GET.get("is_dashboard"):
        #     # ['City A', 'City B', ...]
        #     values = Skill.objects.filter(
        #         user__district=request.user.district
        #     ).values_list("skill_text", flat=True).distinct()[:5]
        #     return Response(values)
        # else:

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

        skills = Skill.objects.filter(user=user)
        serializer = SkillSerializer(skills, many=True)
        print(serializer.data)
        return Response(serializer.data)
        
    else:
        data = request.data
        try:
            Skill.objects.create(user=request.user, skill_text=data['skill_text'])
        except KeyError:
            return Response({
                "message": "Please provide the required data."
            }, status=400)
        
        return Response({"message": "Skill added"})
    