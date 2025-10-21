CREATE TABLE telegram_scraped_data_v3(
message_id VARCHAR UNIQUE,
message_source_link VARCHAR,
message_date DATE,
message_content TEXT,
message_media_photo BYTEA
)
