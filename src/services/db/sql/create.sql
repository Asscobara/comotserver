CREATE TABLE IF NOT EXISTS comotdb.data_info(
   id INT AUTO_INCREMENT PRIMARY KEY,
   create_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS comotdb.roles(
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL 
);

CREATE TABLE IF NOT EXISTS comotdb.address(
   id INT AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(255),
   description VARCHAR(255),
   street VARCHAR(255),
   city VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS comotdb.users(
   id INT AUTO_INCREMENT PRIMARY KEY,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   phone VARCHAR(127),
   remark VARCHAR(255),
   is_logged_in BOOLEAN,
   registration_key VARCHAR(255),   
   registered BOOLEAN,
   role_id INT,
   register_date DATE,
   verify_date DATE,
   address_id INT,
   floor_number INT,
   apartment_number INT
);                 
                                                                  
