import os
import asyncio
from dotenv import load_dotenv
from telethon import TelegramClient
import psycopg2
from psycopg2.extras import execute_values

load_dotenv()

API_ID = int(os.getenv("TELEGRAM_API_ID"))
API_HASH = os.getenv("TELEGRAM_API_HASH")

DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

SESSION_NAME = "telegram_session"

TELEGRAM_CHANNELS = [
    "https://t.me/AlxEthiopiaOfficial",
    "https://t.me/EthioTechnollogy",
    "https://t.me/ethiotech_discussion",
    "https://t.me/TechsAfrica"
]

LIMIT = 50

conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT
)
cursor = conn.cursor()


async def main():
    async with TelegramClient(SESSION_NAME, API_ID, API_HASH) as client:
        print("✅ Telegram client connected")

        all_rows = []

        for channel in TELEGRAM_CHANNELS:
            entity = await client.get_entity(channel)

            channel_username = entity.username
            channel_name = entity.title

            print(f"🔹 Scraping: {channel_name} (@{channel_username})")

            count = 0

            async for message in client.iter_messages(entity, limit=LIMIT):
                if not message.message:
                    continue

                media_bytes = None
                if message.photo:
                    media_bytes = await client.download_media(message.photo, bytes)

                all_rows.append((
                    str(message.id),
                    f"https://t.me/{channel_username}/{message.id}",
                    message.date.date() if message.date else None,
                    message.message,
                    media_bytes,
                    channel_username,
                    channel_name
                ))

                count += 1

            print(f"📥 {count} messages collected")

        if all_rows:
            execute_values(
                cursor,
                """
                INSERT INTO telegram_scraped_data_v3
                (
                    message_id,
                    message_source_link,
                    message_date,
                    message_content,
                    message_media_photo,
                    channel_username,
                    channel_name
                )
                VALUES %s
                ON CONFLICT (message_id) DO NOTHING
                """,
                all_rows
            )

            conn.commit()
            print("✅ Data inserted")

    cursor.close()
    conn.close()
    print("🎉 Done")


asyncio.run(main())
