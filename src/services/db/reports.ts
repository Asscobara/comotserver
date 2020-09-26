import { DBBase } from "./db";
import { getDate } from './../../utils/util';


class Reports extends DBBase<any> {
    
    public async getTotalPaymentSummary(addressId: number, from_date: any) {
        return await this.query(`
                SELECT sum(t.amount) AS total_payment_summary FROM transactions t
                INNER JOIN users u
                ON u.address_id = ${addressId} AND u.id = t.user_id
                AND t.date_time BETWEEN '${getDate(from_date)}' AND NOW()`);
    }

    public async getTasksReport(addressId: number) {
        return await this.query(`
                SELECT status_id, count(id) AS total_tasks FROM tasks
                WHERE address_id = ${addressId}
                GROUP BY status_id`);
    }

    public async getPaymentsReport(addressId: number, from_date: any) {
        return await this.query(`
                SELECT u.id AS user_id, sum(t.amount) AS total_payment FROM transactions t
                INNER JOIN users u
                ON u.address_id = ${addressId} AND u.id = t.user_id
                AND t.user_id = u.id
                AND t.date_time BETWEEN '${getDate(from_date)}' AND NOW()
                GROUP BY u.id`);
    }

    public async getSupliersReport(addressId: number) {
        return await this.query(`
                SELECT s.category_id, COUNT(s.id) AS total_suppliers FROM suppliers s
                INNER JOIN users u
                ON u.address_id = ${addressId} AND u.id = s.user_id
                GROUP BY s.category_id`);
    }

    public get(id: string | number): Promise<any> {
        return this.notImplemented();
    }    
    
    public create(data: any): Promise<any> {
        return this.notImplemented();
    }

    public update(data: any): Promise<any> {
        return this.notImplemented();
    }

    public delete(id: number): Promise<any> {
        return this.notImplemented();
    }

    public getAll(): Promise<any[]> {
        return this.notImplemented();
    }
 
}


export default Reports;