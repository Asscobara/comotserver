import { ISchedule } from "interfaces/users.interface";
import BaseService from "./base.service";
import Schedule from "./db/schedule";

class ScheduleService extends BaseService<ISchedule, Schedule> { 

    protected createDb(): Schedule {
        return new Schedule('Schedule');
    }  
}

export default ScheduleService;

