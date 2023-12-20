from django.contrib import admin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_active', 'date_joined')
    list_filter = ('is_staff', 'is_active', 'date_joined')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    fieldsets = (
        ('Personal Information', {'fields': ('username', 'first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important Dates', {'fields': ('last_login', 'date_joined')}),
    )
    readonly_fields = ('last_login', 'date_joined')

    def get_readonly_fields(self, request, obj=None):
        # Make certain fields read-only for non-superusers
        if not request.user.is_superuser:
            return self.readonly_fields + ('is_staff', 'is_superuser', 'groups', 'user_permissions')
        return self.readonly_fields

