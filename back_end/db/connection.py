import psycopg
import os 
from dotenv import load_dotenv



load_dotenv()


database_name = os.getenv("DB_NAME")
database_user = os.getenv("DB_USER")
database_password =  os.getenv("DB_PASSWORD")
database_host = os.getenv("DB_HOST")
database_port = os.getenv("DB_PORT")




connection =  psycopg.connect(
            dbname=database_name,
            user=database_user,
            host=database_host,
            password=database_password,
            port= database_port)