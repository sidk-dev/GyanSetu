from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from skills.models import Skill
from .models import User

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 3


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    inlines = [SkillInline]

    list_display = (
        "id",
        "email",
        "first_name",
        "last_name",
        "gender",
        "region",
        "district",
        "credits",
        "is_active",
        "is_staff",
        "is_blocked",
        "date_joined",
    )

    list_filter = (
        "is_active",
        "is_staff",
        "is_blocked",
        "gender",
        "region",
        "date_joined",
    )

    search_fields = (
        "email",
        "first_name",
        "last_name",
    )

    ordering = ("-date_joined",)
    readonly_fields = ("date_joined", "last_login")

    fieldsets = (
        ("Login Info", {
            "fields": ("email", "password")
        }),
        ("Personal Info", {
            "fields": (
                "first_name",
                "last_name",
                "gender",
                "date_of_birth",
                "bio",
            )
        }),
        ("Location", {
            "fields": (
                "region",
                "district",
            )
        }),
        ("Credits", {
            "fields": ("credits",)
        }),
        ("Permissions", {
            "fields": (
                "is_active",
                "is_staff",
                "is_blocked",
                "is_superuser",
                "groups",
                "user_permissions",
            )
        }),
        ("Important Dates", {
            "fields": (
                "last_login",
                "date_joined",
            )
        }),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email",
                "first_name",
                "last_name",
                "gender",
                "date_of_birth",
                "password1",
                "password2",
                "is_active",
                "is_staff",
            ),
        }),
    )
