import { NextFunction, Request, Response } from 'express';
import { IEvent, IUser } from '../interfaces/users.interface';

import TasksService from '../services/tasks.service';
import ScheduleService from '../services/schedule.service';
import EventsService from '../services/events.service';
import UserService from '../services/users.service';
import { isNumber } from 'util';

class EventController {
  
  public eventService = new EventsService();
  public taskService = new TasksService();
  public scheduleService = new ScheduleService();
  public usersService = new UserService();
  
  public getAllRelatedEvents = async (req: Request, res: Response, next: NextFunction) => { 
    const addressId: number = Number(req.params.id);
    try {
      const eventData: IEvent[] = await this.eventService.getAllRelatedEvents(addressId);
      for(let i=0; i < eventData.length; i++) {
        eventData[i].schedule_id = (await this.scheduleService.findById(eventData[i].schedule_id as any));
        /*
        const userIds = (eventData[i].user_ids as any)?.split(',');

        if (userIds) {
          eventData[i].user_ids = [];        
          userIds.forEach( async (userId: number) => {
            if (isNumber(+userIds) ) {
              const user: IUser = (await this.usersService.users.get(userId))[0];
              eventData[i].user_ids.push(user);
              // console.log(`==>>> ${JSON.stringify(eventData[i].user_ids)}`);
            }
          });                  
          eventData[i].user_ids = JSON.parse(JSON.stringify(eventData[i].user_ids));
        }
        */
      }

      res.status(200).json({ data: eventData, message: 'findEventsByAddress' });
    } catch (error) {
      next(error);
    }
  }

  public createEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventData: IEvent = req.body;
    try {
      const createEventData: IEvent = await this.eventService.create(eventData);
      res.status(201).json({ data: createEventData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventData: IEvent = req.body;
    try {
      const updateEventData = await this.eventService.update(eventData.id, eventData);
      res.status(200).json({ data: updateEventData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  public deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId : number = Number(req.params.id);
    try {
      // Delete schedule
      const deleteEventData = await this.eventService.delete(eventId);
      res.status(200).json({ data: deleteEventData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }

}

export default EventController;
