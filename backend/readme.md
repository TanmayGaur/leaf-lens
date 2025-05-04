# Setting Up the Django Project

Follow these steps to set up the Django project:

## 1. Clone the Repository
```bash
git clone <repository-url>
cd backend
```

## 2. Create a Virtual Environment
```bash
python -m venv venv
```

## 3. Activate the Virtual Environment
- On Windows:
    ```bash
    venv\Scripts\activate
    ```
- On macOS/Linux:
    ```bash
    source venv/bin/activate
    ```

## 4. Install Dependencies
```bash
pip install -r requirements.txt
```

## 5. Set Up Environment Variables
Create a `.env` file in the project root and configure the required environment variables. Example:
```
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
GEMINI_API_KEY=your_gemini_api

```

## 6. Apply Migrations
```bash
python manage.py migrate
```

## 7. Create a Superuser (Optional)
```bash
python manage.py createsuperuser
```

## 8. Run the Development Server
```bash
python manage.py populate_leaf_data
```

## p. Run the Development Server
```bash
python manage.py runserver
```
