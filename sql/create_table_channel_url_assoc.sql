CREATE TABLE channel_url_assoc (
  channel_id INT NOT NULL,
  url_id int NOT NULL,
  priority int NOT NULL,
  display_duration_sec int NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  created_by VARCHAR(100) NOT NULL,
  updated TIMESTAMP,
  updated_by VARCHAR(100)
);

ALTER TABLE channel_url_assoc ADD CONSTRAINT FK_channel_url_assoc_channels 
FOREIGN KEY (channel_id) REFERENCES channels (channel_id)