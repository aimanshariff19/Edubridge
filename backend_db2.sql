SHOW DATABASES;
USE edubridge;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    role VARCHAR(20)
);
select * from users ;

CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    program_name VARCHAR(100),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SELECT * FROM enrollments;
select * from users ;
CREATE TABLE programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ngo_id INT,
  title VARCHAR(100),
  description TEXT
);
