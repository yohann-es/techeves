from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import psycopg
import os
from dotenv import load_dotenv
import base64

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3030"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_connection():
    return psycopg.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    )

@app.get("/events")
async def get_events(channel: str = None):
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                if channel and channel != "all":
                    cursor.execute(
                        "SELECT * FROM telegram_scraped_data_v3 WHERE channel_username = %s",
                        (channel,)
                    )
                else:
                    cursor.execute("SELECT * FROM telegram_scraped_data_v3")
                
                rows = cursor.fetchall()
                events_list = []

                for row in rows:
                    image_bytes = None
                    if row[4] is not None:
                        image_bytes = row[4].tobytes() if isinstance(row[4], memoryview) else row[4]
                    
                    events_list.append({
                        "message_id": row[0],
                        "source_link": row[1],
                        "message_date": row[2].isoformat() if row[2] else None,
                        "message_info": row[3] or "",
                        "message_image": "" if image_bytes is None else base64.b64encode(image_bytes).decode(),
                        "source_channel": row[5] or "Online",
                        "source_platform": row[6] or "",
                        "channel_username": row[7] or "",
                        "channel_name": row[8] or "",
                        "register_link": None,
                        "tags": [],
                        "event_type": "Tech Event"
                    })

                return {"events": events_list}

    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch events")
