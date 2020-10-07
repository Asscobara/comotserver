import { ISendEmail } from "interfaces/users.interface";


export class CreateSendMailDto implements ISendEmail {
    emails: string[];
    message: string;
}