from django.contrib import admin
from .models import User, Skill

class SkillInline(admin.StackedInline):
    model = Skill
    extra = 3

class UserAdmin(admin.ModelAdmin):
    inlines = [SkillInline]

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Skill)