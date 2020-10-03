import { DBBase } from './db';
import { IAddress, IConfiguration, IConfigurationData } from '../../interfaces/users.interface';

class Configuration extends DBBase<IConfiguration> {

    public constructor(name: string) {
        super(name);
    }

    public async get(id: number | string) {
        return await this.query(`SELECT *  FROM configuration WHERE id = ${id}`);
    }

    public async create(configuration: IConfiguration) {

        if (configuration && configuration.data) {
            for (let i=0; i < configuration.data.length; i++) {
                const data: IConfigurationData = configuration.data[i];
                await this.query(`INSERT INTO configuration(ckey, cvalue, address_id) VALUES('${data.key}', '${data.value}', ${configuration.address_id})`);    
            }
        }

        return await this.getByAddress(configuration.address_id, false);
    }
    
    public async update(configuration: IConfiguration) {

        if (configuration && configuration.data) {
            for (let i = 0; i < configuration.data.length; i++) {
                const data: IConfigurationData = configuration.data[i];
                await this.query(`UPDATE configuration SET cvalue='${data.value}' WHERE id=${data.id}`)    
            }
        }

        return await this.getByAddress(configuration.address_id, false);
    }
    
    public async getAll() {
        return await this.query(`SELECT * FROM configuration`);
    }

    public async delete(id: number) {
        return await this.query(`DELETE FROM configuration WHERE id=${id}`);
    }

    public async getByAddress(addressId: number, getAllConfigurations: boolean) {
        if (addressId == undefined) {
            addressId = -1;
        }
        return await this.query(`SELECT * FROM configuration 
                                WHERE address_id=${addressId} OR 
                                (address_id IS NULL AND ${getAllConfigurations.toString().toUpperCase()}=TRUE)`);

    }

}

export default Configuration;