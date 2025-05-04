from django.db import models
import uuid

class Leaf(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    scientific_name = models.CharField(max_length=200)
    family = models.CharField(max_length=100)
    native_region = models.CharField(max_length=200)
    leaf_type = models.CharField(max_length=100)
    summary = models.TextField()
    image = models.ImageField(upload_to='leaves/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class LeafBenefit(models.Model):
    leaf = models.ForeignKey(Leaf, on_delete=models.CASCADE, related_name='benefits')
    description = models.TextField()
    
    def __str__(self):
        return f"{self.leaf.name} - Benefit"
        
class LeafCharacteristic(models.Model):
    leaf = models.ForeignKey(Leaf, on_delete=models.CASCADE, related_name='characteristics')
    description = models.TextField()
    
    def __str__(self):
        return f"{self.leaf.name} - Characteristic"

class LeafCultivation(models.Model):
    leaf = models.ForeignKey(Leaf, on_delete=models.CASCADE, related_name='cultivation')
    description = models.TextField()
    
    def __str__(self):        return f"{self.leaf.name} - Cultivation"

class LeafPrecaution(models.Model):
    leaf = models.ForeignKey(Leaf, on_delete=models.CASCADE, related_name='precautions')
    description = models.TextField()
    
    def __str__(self):
        return f"{self.leaf.name} - Precaution"
    
class LeafUse(models.Model):
    leaf = models.ForeignKey(Leaf, on_delete=models.CASCADE, related_name='uses')
    category = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return f"{self.leaf.name} - {self.category}"

class LeafRecognitionHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(upload_to='uploads/')
    recognized_leaf = models.ForeignKey(Leaf, on_delete=models.SET_NULL, null=True, blank=True)
    confidence_score = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Recognition {self.id}"
    
    class Meta:
        verbose_name_plural = "Leaf recognition histories"
