import { ISchedule } from "interfaces/users.interface";

export class CreateScheduleDto implements ISchedule {
    public id: number;
    public start_date: any;
    public end_date: any;
    public recuring: boolean;
    public recuring_every_in_days: number;  
  }
  