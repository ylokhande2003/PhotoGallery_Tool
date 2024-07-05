CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  photo LONGBLOB NOT NULL,
  tags VARCHAR(255),
  upload_date DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);



-- Insert sample users with hashed passwords (bcrypt hash)
INSERT INTO users (username, password) VALUES ('user1', '$2a$04$OB5QwOAmS/iTv.D55U07JutYiigHVjJKnTZRSGVW.tgl9A48OFmsG'), ('user2', '$2a$04$1mCoBbD9cO1nZgxHrp8Qn.UD4.97sofSWAqd08mil7rRJR.LmWf2e'), ('user3', '$2a$04$qsm.wJr.JkvBTHvUgRP6l.z7GhYttsLZwQcQ5ZE95vtgNcP61BCqy');
