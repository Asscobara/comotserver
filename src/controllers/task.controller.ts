import { NextFunction, Request, Response } from 'express';
import { ITransaction, ITask } from '../interfaces/users.interface';

import AddressService from '../services/address.service';
import TasksService from '../services/tasks.service';

class TaskController {
  
  public taskService = new TasksService();
  public addressService = new AddressService;

  public getAllRelatedTasks = async (req: Request, res: Response, next: NextFunction) => { 
    const addressId: number = Number(req.params.id);
    const address = await this.addressService.findById(addressId);
    try {
      const taskData: ITask[] = await this.taskService.getAllRelatedTasks(address);
      res.status(200).json({ data: taskData, message: 'findTasksByAddress' });
    } catch (error) {
      next(error);
    }
  }

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    const taskData: ITransaction = req.body;
    try {
      const createTaskData: ITask = await this.taskService.create(taskData);
      res.status(201).json({ data: createTaskData, message: 'created' });
    } catch (error) {
      next(error);
    }
  }

  public updateTask = async (req: Request, res: Response, next: NextFunction) => {
    const taskData: ITask = req.body;
    try {
      const updateTaskData = await this.taskService.update(taskData.id, taskData);
      res.status(200).json({ data: updateTaskData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  public deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    const taskId : number = Number(req.params.id);
    try {
      // Delete schedule
      const deleteTaskIdData = await this.taskService.delete(taskId);
      res.status(200).json({ data: deleteTaskIdData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  }

}

export default TaskController;
