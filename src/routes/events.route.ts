import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import EventController from '../controllers/event.controller';
import { CreateEventDto } from '../dtos/event.dto';

class EventRoute implements Route {
  public path = '/events';
  public router = Router();
  public eventController = new EventController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, this.eventController.getAllRelatedEvents);
    this.router.post(`${this.path}`, validationMiddleware(CreateEventDto), this.eventController.createEvent);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateEventDto, true), this.eventController.updateEvent);
    this.router.delete(`${this.path}/:id(\\d+)`,  this.eventController.deleteEvent);
  }
}

export default EventRoute;
