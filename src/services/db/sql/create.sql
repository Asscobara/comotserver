/*

CREATE TABLE IF NOT EXISTS tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_date DATE,
    due_date DATE,
    status TINYINT NOT NULL,
    priority TINYINT NOT NULL,
    description TEXT,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS checklists (
    todo_id INT AUTO_INCREMENT,
    task_id INT,
    todo VARCHAR(255) NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (todo_id , task_id),
    FOREIGN KEY (task_id)
        REFERENCES tasks (task_id)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

*/

CREATE TABLE IF NOT EXISTS comotdb.data_info(
   id INT AUTO_INCREMENT PRIMARY KEY,
   create_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS comotdb.roles(
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL 
);
INSERT INTO comotdb.roles(name) VALUES('admin');
INSERT INTO comotdb.roles(name) VALUES('manager');
INSERT INTO comotdb.roles(name) VALUES('user');
INSERT INTO comotdb.roles(name) VALUES('guest');


DROP TABLE comotdb.users;

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
   verify_date DATE
);

ALTER TABLE comotdb.users ADD CONSTRAINT users_FK FOREIGN KEY (role_id) REFERENCES comotdb.roles(id);
