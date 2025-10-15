from telethon import TelegramClient,events,sync, utils
import asyncio
import psycopg
import os 
from dotenv import load_dotenv
import re


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
in telethon i could collect content(text) of a message
message id
media(photos, video, etc -> preferebly(photos))
date
messesage content


location # message does not have an attribute location
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

def get_binary_data(file):
       with open(file,'rb') as f:
              binary_data= f.read()
       return binary_data
word_key = "hackathon"
cursor = connection.cursor()
telegram_channel_1 = 'https://t.me/AlxEthiopiaOfficial'
for message in client.iter_messages(telegram_channel_1,limit=2000):
    # print(utils.get_display_name(message.sender), message.message,"\n\n\n")
        if(message.message == '' or message.message == None):
            print("reason empty: ", message.id)
            continue

        if re.search( word_key,message.message) == None : # to search for a speciic word inside every message and if not to continue 
            print("reason not hackaton: ", message.id)
            continue

        try:
                
                # print(message.id, message.message,"\n\n\n")

                # insert_query = f"INSERT INTO Telegram_Scraped_Data_v2 (post_id, source,data) VALUES(%s,%s,%s)"
                insert_query = f"INSERT INTO Telegram_Scraped_Data_v3 (message_id,message_source_link,message_date, message_content,message_media_photo) VALUES(%s,%s,%s,%s,%s)"

                # print(insert_query)
                source_link = f"{telegram_channel_1}/{message.id}"
                image = None
                if message.photo:
                        image = message.download_media(file=bytes)
                cursor.execute(insert_query, (message.id,source_link,message.date,message.message,image))
                
        except (psycopg.errors.UniqueViolation ,psycopg.errors.InFailedSqlTransaction) as e:
            # print(f"{error_counter}) Duplicate values")
            # error_counter += 1
            continue
            print(e)
            
            
        
        connection.commit()
                
# test_mess = client.iter_messages(telegram_channel_1,limit=10)
# for message in test_mess:
#     #    if message.photo:
#     #           path = message.download_media()
#     #           print(f"file saved to {path}")
#     # print(message.date)
#     print(message.sender)
#     break


cursor.close()
connection.close()