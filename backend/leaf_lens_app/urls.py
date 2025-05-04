from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'leaves', views.LeafViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('upload/', views.upload_leaf_image, name='upload-leaf-image'),
    path('chat/', views.chat, name='chat'),
    path('health/', views.health_check, name='health-check'),
]

