CREATE TABLE url_types (
  url_type_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  url_type_cd VARCHAR(20) NOT NULL,
  description VARCHAR(200),
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  created_by VARCHAR(100) NOT NULL,
  updated TIMESTAMP,
  updated_by VARCHAR(100)
);

  ALTER TABLE url_types
  ADD CONSTRAINT uc_url_type_cd UNIQUE (url_type_cd);