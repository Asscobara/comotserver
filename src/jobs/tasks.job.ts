import BaseJob from "./base.job";
import TaskService from "../services/tasks.service";
import UserService from "../services/users.service";
import { ITask, IUser, IAlert, ISchedule } from "../interfaces/users.interface";
import ScheduleService, { IDiffDaysPassed } from "../services/schedule.service";


class TasksJob extends BaseJob { 
    
    constructor() {
        super('tasks');
    }

    protected async perform() { 

        const tasksService = new TaskService();
        const allTasks = await tasksService.findAll();
        const scheduleService = new ScheduleService();
        const userService = new UserService();

        const generateAlert = (task: ITask, alertCodeId: number, user: IUser) => {

            const candidateAlert: IAlert  = {
                id: 0,
                create_date: Date.now(),
                message: JSON.stringify(task),
                sendto_user_id: user.id,
                status_id: 1,
                code_id: alertCodeId
            };
            this.shouldAddAlert(task.address_id, candidateAlert, 'task_alert').then(async (add: boolean)=> {
                if (add) {
                    this.alertService.create(candidateAlert);
                }
            });
        }

        allTasks.forEach( async (task: ITask) => {

            const task_max_new_days: IDiffDaysPassed =  await scheduleService.checkDaysDiff((task.schedule_id as any), task.address_id, 'task_max_new_days');
            const task_max_pending_days: IDiffDaysPassed =  await scheduleService.checkDaysDiff((task.schedule_id as any), task.address_id, 'task_max_pending_days');
            const allManagers = await userService.findAllRelatedUsersByRole(task.address_id, 2);    

            allManagers.forEach( (manager: IUser) => {
                if (task_max_new_days.diffPassed) {
                    generateAlert(task, 3, manager);
                }
                if (task_max_pending_days.diffPassed) {
                    generateAlert(task, 4, manager);
                }
            });
        });
        
    }

}

export default TasksJob;