from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg
import os 
from dotenv import load_dotenv

load_dotenv()

telegram_api_key = os.getenv("TELEGRAM_API_KEY")
telegram_api_id = os.getenv("telegram_api_id")

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
            port= database_port
                            )

app = FastAPI()
origins =[
    "http://localhost:3030"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
cursor = connection.cursor()


select_query = "SELECT * FROM Telegram_Scraped_Data_v2"

cursor.execute(select_query)

selected_data = cursor.fetchall()
modified_selected_data_dict = {}
counter = 0
for data in selected_data:
    modified_selected_data_dict[f"post{counter}"]= {
        "database_id": data[0],
        "source_link": data[1],
        "post_info": data[2]
    }
    counter += 1


# for key in modified_selected_data_dict:
#     print(key, modified_selected_data_dict[key], "\n\n")

@app.get('/')
async def events():
    return {"boy": "welcome my child"}


@app.get('/events')
async def events():
    return modified_selected_data_dict

cursor.close()
connection.close()