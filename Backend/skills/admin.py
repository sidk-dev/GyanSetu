from django.contrib import admin
from skills.models import Skill

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    # Columns to display in the admin list view
    list_display = ('id', 'skill_text', 'user', 'created_at')
    
    # Fields you can click to go to the edit page
    list_display_links = ('id',)
    
    # Fields you can search by
    search_fields = ('skill_text', 'user__username', 'user__email')
    
    # Filters in the right sidebar
    list_filter = ('user', 'created_at')
    
    # Default ordering
    ordering = ('-created_at',)
