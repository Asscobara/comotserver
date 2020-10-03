
import { IConfiguration, IConfigurationData } from 'interfaces/users.interface';

export class CreateConfigurationDto implements IConfiguration {    
    public data: IConfigurationData[];
    public address_id: number;
}
