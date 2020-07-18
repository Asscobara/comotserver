import { ITask, ISchedule } from 'interfaces/users.interface';

export class CreateTaskDto implements ITask {
    public id: number;
    public category_id: number;
    public user_id: number;
    public sipplier_id: number;
    public create_date: any;
    public status_id: number;
    public update_date: any;
    public grade: number;
    public price: number;
    public description: string;
    public schedule_id: ISchedule;
    public address_id: number;
}