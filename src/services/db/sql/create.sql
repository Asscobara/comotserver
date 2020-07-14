CREATE TABLE IF NOT EXISTS comotdb.data_info(
   id INT AUTO_INCREMENT PRIMARY KEY,
   create_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS comotdb.configuration(
   id INT AUTO_INCREMENT PRIMARY KEY,
   ckey VARCHAR(255),
   cvalue VARCHAR(255) 
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
   apartment_number INT,
   CONSTRAINT users_FK FOREIGN KEY (role_id) REFERENCES comotdb.roles(id),
   CONSTRAINT address_FK FOREIGN KEY (address_id) REFERENCES comotdb.address(id)
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
   email_sent BOOLEAN,
   CONSTRAINT users_recipts_FK FOREIGN KEY (user_id) REFERENCES comotdb.users(id)
);

CREATE TABLE IF NOT EXISTS comotdb.transactions(
   id INT AUTO_INCREMENT PRIMARY KEY,
   amount FLOAT,
   transaction_type INT,
   date_time DATE,
   update_date_time DATE,
   user_id INT,
   remark VARCHAR(255),
   recipt_id INT,
   CONSTRAINT transaction_type_FK FOREIGN KEY (transaction_type) REFERENCES comotdb.transaction_types(id),
   CONSTRAINT transactions_users_FK FOREIGN KEY (user_id) REFERENCES comotdb.users(id),
   CONSTRAINT transactions_recipts_FK FOREIGN KEY (recipt_id) REFERENCES comotdb.recipts(id)
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
   category_id INT,
   CONSTRAINT category_FK FOREIGN KEY (category_id) REFERENCES comotdb.categories(id)
);

CREATE TABLE IF NOT EXISTS comotdb.suppliers(
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT, 
   category_id INT,
   sub_categories_id VARCHAR(255),
   remark VARCHAR(255),
   CONSTRAINT user_s_FK FOREIGN KEY (user_id) REFERENCES comotdb.users(id),
   CONSTRAINT category_s_FK FOREIGN KEY (category_id) REFERENCES comotdb.categories(id)
);

CREATE TABLE IF NOT EXISTS comotdb.price_list(
   id INT AUTO_INCREMENT PRIMARY KEY,
   sub_category_id INT,
   supplier_id INT,
   price FLOAT,
   CONSTRAINT sub_category_id_FK FOREIGN KEY (sub_category_id) REFERENCES comotdb.sub_categories(id),
   CONSTRAINT supplier_id_FK FOREIGN KEY (supplier_id) REFERENCES comotdb.suppliers(id)   
);

CREATE TABLE IF NOT EXISTS comotdb.schedules(
   id INT AUTO_INCREMENT PRIMARY KEY,
   start_date DATE,
   end_date DATE,
   recuring BOOLEAN,
   recuring_every_in_days INT
);

CREATE TABLE IF NOT EXISTS comotdb.task_status(
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(64),
   description VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS comotdb.tasks(
   id INT AUTO_INCREMENT PRIMARY KEY,
   category_id INT,
   user_id INT,
   sipplier_id INT,
   create_date DATE,
   status_id INT,
   update_date DATE,
   grade INT,
   price FLOAT,
   description VARCHAR(255),
   schedule_id INT,
   address_id INT,
   CONSTRAINT schedule_category_FK FOREIGN KEY (category_id) REFERENCES comotdb.categories(id),
   CONSTRAINT schedule_user_s_FK FOREIGN KEY (user_id) REFERENCES comotdb.users(id),
   CONSTRAINT schedule_supplier_FK FOREIGN KEY (sipplier_id) REFERENCES comotdb.suppliers(id),
   CONSTRAINT schedule_status_FK FOREIGN KEY (status_id) REFERENCES comotdb.task_status(id),
   CONSTRAINT schedule_schedule_FK FOREIGN KEY (schedule_id) REFERENCES comotdb.schedules(id)
);
