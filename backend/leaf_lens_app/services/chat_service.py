import os
import json
from django.conf import settings
import google.generativeai as genai

# Configure the Gemini API
genai.configure(api_key=settings.GEMINI_API_KEY)

def generate_chat_response(message, leaf_context=None):

    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        system_prompt = """
        You are a helpful plant expert assistant for the Leaf Lens application. 
        Your role is to provide accurate, educational information about plants and their leaves.
        
        When answering:
        1. Be informative and educational
        2. If you're not sure about something, be honest about limitations
        3. Focus on scientific facts and practical uses
        4. Keep responses concise but comprehensive
        5. Be conversational and friendly
        """
        
        # Add leaf context if available
        if leaf_context:
            leaf_info = f"""
            Here is information about the leaf the user is asking about:
            
            Leaf Name: {leaf_context['name']}
            Scientific Name: {leaf_context['scientific_name']}
            Family: {leaf_context['family']}
            Native Region: {leaf_context['native_region']}
            Leaf Type: {leaf_context['leaf_type']}
            summary: {leaf_context['summary']}
            
            Benefits: {'; '.join([benefit['description'] for benefit in leaf_context['benefits']])}
            
            Uses: {'; '.join([f"{use['category']}: {use['description']}" for use in leaf_context['uses']])}
            """
            system_prompt += leaf_info

        # Create the chat and get a response

        chat = model.start_chat(history=[])
        response = chat.send_message(f"{system_prompt}\n\nUser question: {message}")
        
        return response.text
        
    except Exception as e:
        print(f"Error generating chat response: {str(e)}")
        return "I apologize, but I'm having trouble processing your question at the moment. Please try again later."
