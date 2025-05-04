import os
import numpy as np
from PIL import Image
import tensorflow as tf

def load_model():
    try:
        model_path = os.path.join(os.path.dirname(__file__), '../Model/IMAGE_MODEL.keras')
        return tf.keras.models.load_model(model_path, compile=False)
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        raise

# Loading the model once at the start
model = load_model()

labels = [
   'Aloevera', 'Amla', 'Amruthaballi', 'Arali', 'Astma weed', 'Badipala', 'Balloon Vine', 'Bamboo', 'Beans', 'Betel', 'Bhrami', 'Bringaraja', 'Caricature', 'Castor', 'Catharanthus', 'Chakte', 'Chilly', 'Citron lime (herelikai)', 'Coffee', 'Common rue (naagdalli)', 'Coriender', 'Curry', 'Doddpathre', 'Ekka', 'Eucalyptus', 'Ganigale', 'Ganike', 'Gasagase', 'Ginger', 'Globe Amarnath', 'Guava', 'Henna', 'Hibiscus', 'Honge', 'Insulin', 'Jackfruit', 'Kohlrabi', 'Lantana', 'Lemon', 'Malabar Nut', 'Malabar Spinach', 'Mango', 'Marigold', 'Mint', 'Neem', 'Nelavembu', 'Nerale', 'Nooni', 'Onion', 'Padri', 'Palak (Spinach)', 'Papaya', 'Parijatha', 'Patharchatta', 'Pomoegranate', 'Pumpkin', 'Rose', 'Sampige', 'Seethapala', 'Tamarind', 'Taro', 'Tecoma', 'Thumbe', 'Tomato', 'Tulsi', 'Turmeric', 'ashoka', 'camphor', 'kamakasturi', 'kepala'
   ]


def predict_plant(image, model, labels, confidence_threshold=0.6):
    img = tf.keras.preprocessing.image.load_img(image, target_size=(299, 299))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    predictions = model.predict(img_array)

    score = tf.nn.sigmoid(predictions[0])
    predicted_index = np.argmax(score)
    confidence = 100 * np.max(score)
    if confidence / 100 < confidence_threshold:
        return "Non-Leaf Image", confidence

    if predicted_index < len(labels):
        predicted_label = labels[predicted_index]
    else:
        predicted_label = "Unknown"

    return predicted_label, confidence


def identify_leaf(image_file):
   
    # model = load_model()

    # Save the uploaded file temporarily
    temp_image_path = f"temp_{os.path.basename(image_file.name)}"
    with open(temp_image_path, 'wb+') as destination:
        for chunk in image_file.chunks():
            destination.write(chunk)

    try:
        predicted_label, confidence = predict_plant(temp_image_path, model, labels)

        result = {
            'name': predicted_label if predicted_label else "Unknown",
            'confidence': confidence if predicted_label else 0.0,
            'method': 'xception_model'
        }
        return result
        
    except Exception as e:
        # Log the error and return a fallback
        print(f"Error in leaf identification: {str(e)}")
        return {
            'name': "Unknown",
            'confidence': 0.0,
            'is_leaf_detected': False,
            'error': str(e),
            'method': 'exception_model'
        }
    
    finally:
        # Clean up temporary file
        if os.path.exists(temp_image_path):
            os.remove(temp_image_path)
