
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
  registered: boolean;
}

export interface IAddress {
  id: number;
  title: string;
  description: string;
  street: string;
  city: string;
  payment_day_in_month: number;
  payment_amount: number;
}

export interface ITransaction {
  id: number;
  amount: number;
  transaction_type: number;
  date_time: any;
  user_id: number;
  remark: string;
  send_recipt: boolean;
}

export interface IRecipt {
  id: number;
  recipt_number: string;
  user_id: number;
  date_time: any;
  email_sent: boolean;
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
}

export interface ISubCategory {
  id: number;
  name: string;
  description: string;
  category_id: number;
}

export interface ISupplier {
  id: number;
  user_id: IUser;
  remark: string;
  category_id: number;
  sub_categories_id: string;
}

export interface IPrice {
  id: number;
  sub_category_id: number;
  supplier_id: ISupplier;
  price: number;
}

export interface ISchedule {
  id: number;
  start_date: any;
  end_date: any;
  recuring: boolean;
  recuring_every_in_days: number;  
}

export interface ITask {
  id: number;
  category_id: number;
  user_id: number;
  sipplier_id: number;
  create_date: any;
  status_id: number;
  update_date: any;
  grade: number;
  price: number;
  description: string;
  schedule_id: ISchedule;
  address_id: number;
}

export interface IReportRequest {
  
}
