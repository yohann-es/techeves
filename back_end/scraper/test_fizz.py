from telethon import TelegramClient, events
import os 
from dotenv import load_dotenv
import re



load_dotenv()


telegram_api_key = os.getenv("TELEGRAM_API_KEY")
telegram_api_id = os.getenv("telegram_api_id")



word_key = "hackathon"


client = TelegramClient('anon', telegram_api_id, telegram_api_key)

me =  client.get_me()


@client.on(events.NewMessage(chats='https://t.me/testting_scrape'))
async def my_event_handler(event):
        if re.search( word_key,event.raw_text) != None : # to search for the speciic word inside every message and if not to continue 
            print(event.raw_text)
        

client.start()
client.run_until_disconnected()