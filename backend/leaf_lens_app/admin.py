from django.contrib import admin
from .models import Leaf, LeafBenefit, LeafUse, LeafRecognitionHistory, LeafCharacteristic, LeafCultivation, LeafPrecaution

class LeafBenefitInline(admin.TabularInline):
    model = LeafBenefit
    extra = 1

class LeafUseInline(admin.TabularInline):
    model = LeafUse
    extra = 1

class LeafCharacteristicInline(admin.TabularInline):
    model = LeafCharacteristic
    extra = 1

class LeafLeafCultivationInline(admin.TabularInline):
    model = LeafCultivation
    extra = 1

class LeafPrecautionInline(admin.TabularInline):
    model = LeafPrecaution
    extra = 1

@admin.register(Leaf)
class LeafAdmin(admin.ModelAdmin):
    list_display = ('name', 'scientific_name', 'family', 'native_region', 'created_at')
    search_fields = ('name', 'scientific_name', 'description')
    list_filter = ('family', 'native_region')
    inlines = [LeafBenefitInline, LeafUseInline, LeafCharacteristicInline, LeafLeafCultivationInline, LeafPrecautionInline]

@admin.register(LeafRecognitionHistory)
class LeafRecognitionHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'recognized_leaf', 'confidence_score', 'created_at')
    list_filter = ('recognized_leaf', 'created_at')
    readonly_fields = ('id', 'image', 'recognized_leaf', 'confidence_score', 'created_at')
