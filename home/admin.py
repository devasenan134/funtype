from django.contrib import admin
from .models import Quote

# Register your models here.
class QuoteAdmin(admin.ModelAdmin) :
    list_display = ("id", "text")

admin.site.register(Quote, QuoteAdmin)
