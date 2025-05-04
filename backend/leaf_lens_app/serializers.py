from rest_framework import serializers
from .models import Leaf, LeafBenefit, LeafUse, LeafRecognitionHistory, LeafCharacteristic, LeafCultivation, LeafPrecaution

class LeafBenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeafBenefit
        fields = ('id', 'description')

class LeafUseSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeafUse
        fields = ('id', 'category', 'description')

class LeafCharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeafCharacteristic
        fields = ('id', 'description')

class LeafCultivationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeafCultivation
        fields = ('id', 'description')

class LeafPrecautionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeafPrecaution
        fields = ('id', 'description')

class LeafSerializer(serializers.ModelSerializer):
    benefits = LeafBenefitSerializer(many=True, read_only=True)
    uses = LeafUseSerializer(many=True, read_only=True)
    characteristics = LeafCharacteristicSerializer(many=True, read_only=True)
    cultivation = LeafCultivationSerializer(many=True, read_only=True)
    precautions = LeafPrecautionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Leaf
        fields = (
            'id', 'name', 'scientific_name', 'family', 'native_region',
            'leaf_type', 'summary', 'image', 'benefits', 'uses', 'characteristics', 'cultivation', 'precautions'
        )

class LeafRecognitionHistorySerializer(serializers.ModelSerializer):
    recognized_leaf = LeafSerializer(read_only=True)
    
    class Meta:
        model = LeafRecognitionHistory
        fields = ('id', 'image', 'recognized_leaf', 'confidence_score', 'created_at')
        read_only_fields = ('id', 'recognized_leaf', 'confidence_score', 'created_at')

class LeafRecognitionRequestSerializer(serializers.Serializer):
    image = serializers.ImageField()
    
    def validate_image(self, value):
        # Validate image size and format
        if value.size > 10 * 1024 * 1024:  # 10MB
            raise serializers.ValidationError("Image size cannot exceed 10MB")
        
        if not value.name.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            raise serializers.ValidationError("Only PNG, JPG, JPEG, and WEBP images are allowed")
        
        return value

class ChatRequestSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=500)
    leaf_id = serializers.UUIDField(required=False)

class ChatResponseSerializer(serializers.Serializer):
    response = serializers.CharField()
