import { IAddress, ITask } from '../interfaces/users.interface';
import BaseService from './base.service';
import Task from './db/task';

class TasksService extends BaseService<ITask, Task>  {

    protected createDb(): Task {
        return new Task('task');
    }

    public async getAllRelatedTasks(address: IAddress): Promise<ITask[]> {
        return (this.db as Task).getAddressTasks(address);
    }
}

export default TasksService;
