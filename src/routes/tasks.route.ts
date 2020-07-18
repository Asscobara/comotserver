import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

import TaskController from '../controllers/Task.controller';
import { CreateTaskDto } from '../dtos/Task.dto';

class TaskRoute implements Route {
  public path = '/tasks';
  public router = Router();
  public TaskController = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, this.TaskController.getAllRelatedTasks);
    this.router.post(`${this.path}`, validationMiddleware(CreateTaskDto), this.TaskController.createTask);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateTaskDto, true), this.TaskController.updateTask);
    this.router.delete(`${this.path}/:id(\\d+)`,  this.TaskController.deleteTask);
  }
}

export default TaskRoute;
