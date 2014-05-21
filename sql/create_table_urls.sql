CREATE TABLE urls (
  url_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  url_string VARCHAR(2000) NOT NULL,
  description VARCHAR(200),
  url_type_id int NOT NULL,
  active boolean NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  created_by VARCHAR(100) NOT NULL,
  updated TIMESTAMP,
  updated_by VARCHAR(100)
);


ALTER TABLE urls ADD CONSTRAINT FK_url_url_type_id
FOREIGN KEY (url_type_id) REFERENCES url_types(url_type_id)