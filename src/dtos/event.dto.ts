import { IEvent, ISchedule } from 'interfaces/users.interface';

export class CreateEventDto implements IEvent {
    public id: number;
    public name: string;
    public create_date: any;
    public schedule_id: ISchedule;
    public remark: string;
    public status_id: number;
    public address_id: number;    
}