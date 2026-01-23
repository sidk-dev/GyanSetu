from django.contrib import admin
from .models import Slot


@admin.register(Slot)
class SlotAdmin(admin.ModelAdmin):
    # Columns shown in the list view
    list_display = (
        "id",
        "skill_text",
        "user",
        "for_user",
        "start_time",
        "end_time",
        "created_at",
    )

    # Clickable field
    list_display_links = ("id", "skill_text")

    # Filters on the right sidebar
    list_filter = (
        "start_time",
        "end_time",
        "created_at",
        "user",
    )

    # Search box
    search_fields = (
        "skill_text",
        "description",
    )

    readonly_fields = ("created_at",)
    ordering = ("-start_time",)
    date_hierarchy = "start_time"

    # Layout Imprvement.
    fieldsets = (
        ("Slot Info", {
            "fields": ("skill_text", "description")
        }),
        ("Timing", {
            "fields": ("start_time", "end_time")
        }),
        ("Users", {
            "fields": ("user", "for_user")
        }),
        ("Meta", {
            "fields": ("created_at",),
        }),
    )

