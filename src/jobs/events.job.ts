
import AddressService from '../services/address.service';
import UserService from "../services/users.service";
import EventsService from "../services/events.service";
import ScheduleService, { IDiffDaysPassed } from "../services/schedule.service";
import EmailService from "../services/email/email.service";

import BaseJob from './base.job'

import { IAddress, IUser, IAlert, IEvent, ISchedule } from "../interfaces/users.interface";
import { getDate } from "../utils/util";

class EventsJob extends BaseJob {


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
                 const event_alert_days: IDiffDaysPassed =  await scheduleService.checkDaysDiff((event.schedule_id as any), address.id, 'event_alert_days');                                 
                 if (event_alert_days.diffPassed) {
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
                            this.shouldAddAlert(address.id, candidateAlert, 'event_alert').then(async (add: boolean)=> {
                                if (add) {
                                    this.alertService.create(candidateAlert);
                                    const sendEmailAlerts = await this.configurationService.getConfigurationValue(address.id, 'send_email_alerts');
                                    if (sendEmailAlerts == 'ture') {
                                        EmailService.sendEventReminderEmail(user, getDate( new Date(event_alert_days.schedule.start_date)));
                                    }
                                }
                            });                            
                        }
                     });
                 }  
            });
        });
    } 
}
  
export default EventsJob;