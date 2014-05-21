CREATE TABLE urls (
  url_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  url_string VARCHAR(2000) NOT NULL,
  description VARCHAR(200),
  url_type int NOT NULL,
  active boolean NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  created_by VARCHAR(100) NOT NULL,
  updated TIMESTAMP,
  updated_by VARCHAR(100)
);