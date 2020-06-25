export interface IUser {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_logged_in: boolean;
  role_id: number;
  phone: string;
  remark: string;
}

/*
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
*/