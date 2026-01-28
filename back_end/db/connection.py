import psycopg
import os
from dotenv import load_dotenv
from pathlib import Path

# Load .env from back_end directory explicitly
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

# Read environment variables
database_name = os.getenv("DB_NAME")
database_user = os.getenv("DB_USER")
database_password = os.getenv("DB_PASSWORD")
database_host = os.getenv("DB_HOST")
database_port = os.getenv("DB_PORT")

# Create connection
connection = psycopg.connect(
    dbname=database_name,
    user=database_user,
    password=database_password,
    host=database_host,
    port=database_port
)
