CREATE TABLE channels (
  channel_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  channel_cd VARCHAR(40) NOT NULL,
  description VARCHAR(200),
  active boolean NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  created_by VARCHAR(100) NOT NULL,
  updated TIMESTAMP,
  updated_by VARCHAR(100)
);