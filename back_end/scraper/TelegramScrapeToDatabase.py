from telethon import TelegramClient,events,sync, utils
import asyncio
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

client = TelegramClient(
    "anon",
    api_hash=telegram_api_key,
    api_id=telegram_api_id
).start()

"""
in telethon i could collect
content(text) of a message
sender id
media(photos, video, etc -> preferebly(photos))
date
location
user/channel id
chat's title , id, participants list
event based info
        like new message 
        forwards 
        upon delets
        replies(chats)


"""
connection =  psycopg.connect(
            dbname=database_name,
            user=database_user,
            host=database_host,
            password=database_password,
            port= database_port)

# for message in client.get_messages('https://t.me/AlxEthiopiaOfficial', limit=1000):
#     print(message.id)

# channel_entity = client.get_entity('https://t.me/AlxEthiopiaOfficial')
# message_spec = client.get_messages(channel_entity,ids=2707)
# print(message_spec.message)
# error_counter = 1

cursor = connection.cursor()
telegram_channel_1 = 'https://t.me/AlxEthiopiaOfficial'
for message in client.iter_messages(telegram_channel_1,limit=700):
    # print(utils.get_display_name(message.sender), message.message,"\n\n\n")
        if(message.message == '' ):
                    continue
        else:
            try:
                    
                    # print(message.id, message.message,"\n\n\n")

                    insert_query = f"INSERT INTO Telegram_Scraped_Data_v2 (post_id, source,data) VALUES(%s,%s,%s)"
                    # insert_query = f"INSERT INTO test_Telegram_Scraped_Data_v2 (post_id, source,data) VALUES(%s,%s,%s)"

                    # print(insert_query)
                    source_link = f"{telegram_channel_1}/{message.id}"
                    cursor.execute(insert_query, (message.id,source_link,message.message))
                    
            except (psycopg.errors.UniqueViolation ,psycopg.errors.InFailedSqlTransaction) as e:
                # print(f"{error_counter}) Duplicate values")
                # error_counter += 1
                continue
                print(e)
                
                
            
            connection.commit()
                





cursor.close()
connection.close()