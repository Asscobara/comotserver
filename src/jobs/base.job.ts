import * as schedule from "node-schedule";
import { IConfiguration, IAlert } from "../interfaces/users.interface";
import ConfigurationService from "../services/configuration.service";
import { printDebug } from "../utils/util";
import AlertService from "../services/alert.service";

class BaseJob { 

    protected allConfigurations: IConfiguration[];
    protected configurationService: ConfigurationService;
    protected alertService = new AlertService();
    
    constructor(protected name: string) {
        this.init();
    }

    protected async perform() { 
        console.log(`Job ${this.name} has no perform implemantation`);
    }

    public init() {
        console.log(`init ${this.name} job`);
        this.configurationService = new ConfigurationService();
        var rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(0, 6)];
        rule.hour = 18;
        rule.minute = 0;
        schedule.scheduleJob(rule, async () => {
            console.log(`schedule start perform for ${this.name} job`);
            this.perform();
        });
    }

    protected async shouldAddAlert(addressId: number, alert: IAlert, configurationKey: string) {
        const eventAlert = await this.configurationService.getConfigurationValue(addressId, configurationKey);
        const allAlerts = await this.alertService.findAll();
        const found = allAlerts.find(a => {
                return a.code_id == alert.code_id && 
                   a.message == alert.message &&
                   a.sendto_user_id == alert.sendto_user_id
        });
        return (found == null || found == undefined) && eventAlert == 'true';
    }
}

export default BaseJob;