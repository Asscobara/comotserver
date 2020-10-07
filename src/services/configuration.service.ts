import { IConfiguration } from '../interfaces/users.interface';
import BaseService from './base.service';
import Configuration from './db/configuration';
import { CreateConfigurationDto } from '../dtos/configuration.dto';
import { printDebug } from '../utils/util';

class ConfigurationService extends BaseService<IConfiguration, Configuration>  {

    protected createDb(): Configuration {
        return new Configuration('configuration');
    }  

    public async updateConfiguration(data: IConfiguration) {
        return await this.db.update(data);
    }

    public async createAddressConfig(addressId: number) {
        let addressConfig: IConfiguration = await (this.db as Configuration).getByAddress(addressId, true);
        addressConfig = this.createConfig(addressConfig)        
        addressConfig.address_id = addressId;
        return await this.db.create(addressConfig);
    }

    public async getByAddress(addressId: number) {
        const addressConfig = await (this.db as Configuration).getByAddress(addressId, false);        
        return this.createConfig(addressConfig);
    }  

    private createConfig(addressConfiguration: any) {
        const configuration: CreateConfigurationDto = new CreateConfigurationDto();
        
        configuration.address_id = addressConfiguration.address_id;
        configuration.data = [];

        addressConfiguration.forEach( (config: any) => {
            configuration.data.push( {
                id: config.id,
                value: config.cvalue,
                key: config.ckey
            });
        });
        return configuration;
    }

    public async getConfigurationValue(addressId: number, key: string) {
        const addressConfig = await this.getByAddress(addressId);
        const a = addressConfig.data.find(d => (d as any).key == key);
        return (a as any)?.value;
    }     
}

export default ConfigurationService;
