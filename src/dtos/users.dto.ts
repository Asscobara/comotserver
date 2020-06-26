import { IsEmail, IsString } from 'class-validator';
import { IUser } from 'interfaces/users.interface';

export class CreateUserDto implements IUser {
  
  public id: number;
  
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  public first_name: string;
  public last_name: string;

  public is_logged_in: boolean;
  public role_id: number;
  public phone: string;
  public remark: string;
  public address_id: number;
}
