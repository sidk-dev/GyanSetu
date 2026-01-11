from django.contrib import admin
from skills.models import Skill
from .models import User

class SkillInline(admin.StackedInline):
    model = Skill
    extra = 3

class UserAdmin(admin.ModelAdmin):
    inlines = [SkillInline]

# Register your models here.
admin.site.register(User, UserAdmin)