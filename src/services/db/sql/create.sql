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
   city VARCHAR(255),
   payment_day_in_month INT,
   payment_amount FLOAT
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

CREATE TABLE IF NOT EXISTS comotdb.transaction_types(
   id INT AUTO_INCREMENT PRIMARY KEY,   
   name VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS comotdb.recipts(
   id INT AUTO_INCREMENT PRIMARY KEY,
   recipt_number VARCHAR(64),
   user_id INT,
   date_time DATE,
   email_sent BOOLEAN
);

CREATE TABLE IF NOT EXISTS comotdb.transactions(
   id INT AUTO_INCREMENT PRIMARY KEY,
   amount FLOAT,
   transaction_type INT,
   date_time DATE,
   update_date_time DATE,
   user_id INT,
   remark VARCHAR(255),
   recipt_id INT
);
 
CREATE TABLE IF NOT EXISTS comotdb.categories(
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   description VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS comotdb.sub_categories(
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   description VARCHAR(255) NOT NULL,
   category_id INT
);

CREATE TABLE IF NOT EXISTS comotdb.suppliers(
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT, 
   category_id INT,
   sub_categories_id VARCHAR(255),
   remark VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS comotdb.price_list(
   id INT AUTO_INCREMENT PRIMARY KEY,
   sub_category_id INT,
   supplier_id INT,
   price FLOAT
);
                                                                  
