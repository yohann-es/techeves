CREATE TABLE telegram_scraped_data_v3 (
    message_id character varying,
    message_source_link character varying,
    message_date date,
    message_content text,
    message_media_photo bytea,
    source_channel character varying,
    source_platform character varying,
    channel_username text,
    channel_name text
);
