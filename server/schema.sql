CREATE DATABASE IF NOT EXISTS titus_library;
USE titus_library;
CREATE TABLE IF NOT EXISTS app_data (
  data_key VARCHAR(40) PRIMARY KEY,
  data_value JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT IGNORE INTO app_data (data_key, data_value) VALUES
('books', JSON_ARRAY()),
('transactions', JSON_ARRAY()),
('users', JSON_ARRAY(JSON_OBJECT('id','usr_admin','name','Head Librarian','membershipId','Tsotetsi','password','Tite@2025','role','admin')));
