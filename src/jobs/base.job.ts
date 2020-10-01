import * as schedule from "node-schedule";

class BaseJob { 

    constructor(protected name: string) {
        this.init();
    }

    protected async perform() { 
        console.log(`Job ${this.name} has no perform implemantation`);
    }

    public init() {
        console.log(`init ${this.name} job`);
        var rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(0, 6)];
        rule.hour = [0, new schedule.Range(0, 23)]; // 18;
        rule.minute = [0, new schedule.Range(0, 59)]; // 0;
        rule.second = [0, new schedule.Range(0, 20)]; // 0;
        schedule.scheduleJob(rule, async () => {
            this.perform();
        });
    }

     
}

export default BaseJob;