import * as schedule from "node-schedule";
import { IConfiguration } from "../interfaces/users.interface";
import ConfigurationService from "../services/configuration.service";
import { printDebug } from "../utils/util";

class BaseJob { 

    protected allConfigurations: IConfiguration[];
    protected configurationService: ConfigurationService;
    constructor(protected name: string) {
        this.init();
    }

    protected async perform() { 
        console.log(`Job ${this.name} has no perform implemantation`);
    }

    public init() {
        console.log(`init ${this.name} job`);
        this.configurationService = new ConfigurationService();
        this.configurationService.findAll().then(all => {
            this.allConfigurations = all;
        });
        var rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(0, 6)];
        rule.hour = [0, new schedule.Range(0, 23)]; // 18;
        rule.minute = [0, new schedule.Range(0, 59)]; // 0;
        schedule.scheduleJob(rule, async () => {
            this.perform();
        });
    }

    protected getConfigurationValue(addressId: number, key: string) {
        const addressConfig = this.allConfigurations.filter(a => a.address_id == addressId);
        const a = addressConfig.find(d => (d as any).ckey == key);
        return (a as any).cvalue;
    }     
}

export default BaseJob;