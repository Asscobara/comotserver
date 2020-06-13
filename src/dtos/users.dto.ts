import { IsEmail, IsString } from 'class-validator';
import { IUser } from 'interfaces/users.interface';

export class CreateUserDto implements IUser {
  
  public id: number;
  
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public first_name: string;

  @IsString()
  public last_name: string;

}
