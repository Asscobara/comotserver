import { IPaymentReport, ISuppliersReport, ITaskReport } from '../interfaces/users.interface';
import Reports from './db/reports';

class ReportsService {
    
    reports: Reports = new Reports('reports');

    public async getPaymentsStatus(addressId: number, from_date: any): Promise<IPaymentReport[]> {
        const rep = await this.reports.getPaymentsReport(addressId, from_date);
        return rep;
    }

    public async getSupliersReport(addressId: number): Promise<ISuppliersReport> { 
        const rep = await this.reports.getSupliersReport(addressId);
        return rep;
    }

    public async getTasksReport(addressId: number): Promise<ITaskReport[]> {
        const rep = await this.reports.getTasksReport(addressId);
        return rep;
    }

}

export default ReportsService;
