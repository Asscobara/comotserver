
//Common file with UI
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
  address_id: number;
  floor_number: number;
  apartment_number: number;
}

export interface IAddress {
  id: number;
  title: string;
  description: string;
  street: string;
  city: string;
}

export interface ITransaction {
  id: number;
  amount: number;
  transaction_type: number;
  date_time: any;
  user_id: number;
  remark: string;
}