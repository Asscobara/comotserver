import { ISchedule } from "interfaces/users.interface";
import BaseService from "./base.service";
import Schedule from "./db/schedule";
import { getDiffInDays } from "../utils/util";
import ConfigurationService from "./configuration.service";

class ScheduleService extends BaseService<ISchedule, Schedule> { 
    
    private configurationService: ConfigurationService;
 
    constructor() {
        super();     
        this.configurationService = new ConfigurationService();   
    }

    protected createDb(): Schedule {
        return new Schedule('Schedule');
    } 

    public async checkDaysDiff(scheduleId: number, addressId: number, configurationKey: string): Promise<IDiffDaysPassed> {
        const schedule: ISchedule = await this.findById( (scheduleId as any) );                 
        const today = new Date();                 
        const startDate = new Date(schedule.start_date);
        const diffInDays = getDiffInDays(startDate, today);
        const event_alert_days = await this.configurationService.getConfigurationValue(addressId, configurationKey);

        return { 
            diffPassed: diffInDays >= +event_alert_days, 
            schedule: schedule 
        };
    }
}

export default ScheduleService;

export interface IDiffDaysPassed {
    diffPassed: boolean,
    schedule: ISchedule
}

