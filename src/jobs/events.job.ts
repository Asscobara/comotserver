
import AddressService from '../services/address.service';
import UserService from "../services/users.service";
import AlertService from "../services/alert.service";
import EventsService from "../services/events.service";
import ScheduleService from "../services/schedule.service";
import EmailService from "../services/email/email.service";

import BaseJob from './base.job'

import { IAddress, IUser, IAlert, IEvent, ISchedule } from "../interfaces/users.interface";
import { getDiffInDays, getDate } from "../utils/util";

class EventsJob extends BaseJob {

    public alertService = new AlertService();

    constructor() {
        super('events');
    }

    protected async perform() {
        
        const eventService = new EventsService();
        const scheduleService = new ScheduleService();
        const userService = new UserService();    

        const addressService = new AddressService();
        const allBuildings = await addressService.findAll();
        allBuildings.forEach( async (address: IAddress) => { 
            const addressEvents = await eventService.getAllRelatedEvents(address.id);
            addressEvents.forEach( async (event: IEvent) => {
                 const schedule: ISchedule = await scheduleService.findById( (event.schedule_id as any) );                 
                 const today = new Date();                 
                 const startDate = new Date(schedule.start_date);
                 const diffInDays = getDiffInDays(startDate, today);
                 const event_alert_days = this.getConfigurationValue(address.id, 'event_alert_days');
                 if (diffInDays >= +event_alert_days) {
                     const invitedUserIds = (event.user_ids as any).split(',');   
                     invitedUserIds.forEach(async (userId: number) => {
                        const user: IUser = await userService.findUserById(+userId);
                        if (user) {
                            const candidateAlert: IAlert  = {
                                id: 0,
                                create_date: Date.now(),
                                message: JSON.stringify({
                                    'remark': event.remark,
                                    'addressId': address.id,
                                }),
                                sendto_user_id: user.id,
                                status_id: 1,
                                code_id: 2
                            };
                            this.shouldAddAlert(address.id, candidateAlert).then((add: boolean)=> {
                                if (add) {
                                    this.alertService.create(candidateAlert);
                                    const sendEmailAlerts = this.getConfigurationValue(address.id, 'send_email_alerts');
                                    if (sendEmailAlerts == 'ture') {
                                        EmailService.sendEventReminderEmail(user, getDate(startDate));
                                    }
                                }
                            });                            
                        }
                     });
                 }  
            });
        });
    } 
    
    public async shouldAddAlert(addressId: number, alert: IAlert) {
        const eventAlert = this.getConfigurationValue(addressId, 'event_alert');
        const allAlerts = await this.alertService.findAll();
        const found = allAlerts.find(a => {
                return a.code_id == alert.code_id && 
                   a.message == alert.message &&
                   a.status_id == alert.status_id && 
                   a.sendto_user_id == alert.sendto_user_id
        });
        return found == null && eventAlert == 'true';
    }
}
  
export default EventsJob;