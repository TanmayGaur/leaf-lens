from rest_framework import viewsets, status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from django.db import models

from .models import Leaf, LeafRecognitionHistory
from .serializers import (
    LeafSerializer,
    LeafRecognitionRequestSerializer,
    LeafRecognitionHistorySerializer,
    ChatRequestSerializer,
    ChatResponseSerializer
)
from .services.leaf_recognition import identify_leaf
from .services.chat_service import generate_chat_response

class LeafViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Leaf.objects.all().prefetch_related('benefits', 'uses', 'characteristics', 'cultivation', 'precautions')
    serializer_class = LeafSerializer
    lookup_field = 'id'

    def get_queryset(self):
        queryset = super().get_queryset()
        search_query = self.request.query_params.get('search', None)

        if search_query:
            # Split the search query into keywords
            search_keywords = search_query.split('%20')  
            flexible_query = models.Q()  # Initialize an empty Q object for flexible filtering

            # Add conditions for each keyword to search across multiple fields
            for keyword in search_keywords:
                flexible_query |= models.Q(name__icontains=keyword)
                flexible_query |= models.Q(scientific_name__icontains=keyword)
                flexible_query |= models.Q(family__icontains=keyword)

            # Filter the queryset based on the flexible query
            queryset = queryset.filter(flexible_query)

        return queryset


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_leaf_image(request):
    serializer = LeafRecognitionRequestSerializer(data=request.data)
    
    if serializer.is_valid():
        image = serializer.validated_data['image']
        
        try:
            # Identify the leaf
            recognition_result = identify_leaf(image)
            
            if recognition_result['name'] == 'Unknown':
                return Response({
                    'success': False,
                    'message': f"Label not found",
                }, status=status.HTTP_400_BAD_REQUEST)
            
            leaf = get_object_or_404(Leaf, name=recognition_result['name']) if recognition_result['confidence'] > 60 else None

            # history = LeafRecognitionHistory.objects.create(
            #     image=image,
            #     recognized_leaf=leaf,
            #     confidence_score=recognition_result['confidence']
            # )
            
            # Prepare the response
            # history_serializer = LeafRecognitionHistorySerializer(history)
            
            return Response({
                'success': True,
                'message': 'Image uploaded and processed successfully',
                'recognition': recognition_result,
                'leaf_id': leaf.id if leaf else None,
                # 'history': history_serializer.data
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'success': False,
                'message': f'Error processing image: {str(e)}',
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def chat(request):

    serializer = ChatRequestSerializer(data=request.data)
    
    if serializer.is_valid():
        message = serializer.validated_data['message']
        leaf_id = serializer.validated_data.get('leaf_id')
 
        try:
            # Get leaf context if leaf_id is provided
            leaf_context = None
            if leaf_id:
                leaf = get_object_or_404(Leaf, id=leaf_id)
                leaf_serializer = LeafSerializer(leaf)
                leaf_context = leaf_serializer.data
            
            # Generate response
            response = generate_chat_response(message, leaf_context)
            
            response_serializer = ChatResponseSerializer({'response': response})
            return Response(response_serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'success': False,
                'message': f'Error generating response: {str(e)}',
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def health_check(request):
    return Response({"status": "ok", "message": "API is running"})