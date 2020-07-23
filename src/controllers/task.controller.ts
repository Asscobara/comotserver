import { NextFunction, Request, Response } from 'express';
import { ITransaction, ITask } from '../interfaces/users.interface';

import AddressService from '../services/address.service';
import TasksService from '../services/tasks.service';
import SuppliersService from '../services/suppliers.service';
import UserService from '../services/users.service';
import ScheduleService from '../services/schedule.service';

class TaskController {
  
  public taskService = new TasksService();
  public addressService = new AddressService();
  public supliersService = new SuppliersService();
  public usersService = new UserService();
  public scheduleService = new ScheduleService();

  public getAllRelatedTasks = async (req: Request, res: Response, next: NextFunction) => { 
    const addressId: number = Number(req.params.id);
    const address = await this.addressService.findById(addressId);
    try {
      const taskData: ITask[] = await this.taskService.getAllRelatedTasks(address);
      for(let i=0; i < taskData.length; i++) {
        taskData[i].sipplier_id = await this.supliersService.findById(taskData[i].sipplier_id as any);
        taskData[i].sipplier_id.user_id = (await this.usersService.users.get(taskData[i].sipplier_id.user_id as any))[0];
        taskData[i].user_id = (await this.usersService.users.get(taskData[i].user_id as any))[0];
        taskData[i].schedule_id = (await this.scheduleService.findById(taskData[i].schedule_id as any));
      }
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
