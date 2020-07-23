import * as nodemailer from 'nodemailer';
import { IUser, IRecipt, ITransaction, ISendEmail } from 'interfaces/users.interface';
import { getDate } from '../../utils/util';


class EmailService {

  private static getTransporter(template: string) {
      const tr = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'asscobara@gmail.com',
          pass: 'bagay1bagay1'
        }
      });
      
      const hbs = require('nodemailer-handlebars');
      tr.use('compile', hbs({
        viewEngine: {
            extName: '.handlebars',
            partialsDir: './src/services/email/templates',
            layoutsDir: './src/services/email/templates',
            defaultLayout: `${template}.handlebars`,
        },
        viewPath: './src/services/email/templates/'
      }));
      return tr;
    }

    private static getOptions(destEmail: string, title: string, template: string, context: any) {
      return {
          from: 'asscobara@gmail.com',
          to: destEmail,
          subject: title,
          template: template,
          context: context
        };
    }

    public static sendPasswordChangedEmail(user: IUser, url: string) {
      console.log(JSON.stringify({ name: user.first_name, url: url, password: user.password}));
      var mailOptions = EmailService.getOptions(user.email, 'ComOt password changed', 'password', { name: user.first_name, url: url, password: user.password});
      this.getTransporter('password').sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('ERROR' + error);
        } else {
          console.log('Email sent: ' + info.response); 
        }
      });
    }

    public static sendVerificationEmail(user: IUser, url: string) {
      var mailOptions = EmailService.getOptions(user.email, 'ComOt activation email', 'verify', { name: user.first_name, registerUrl: url });
      this.getTransporter('verify').sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('ERROR' + error);
        } else {
          console.log('Email sent: ' + info.response); 
        }
      });
    }

    public static sendUserRecipt(user: IUser, recipt: IRecipt, transaction: ITransaction) {
      var mailOptions = EmailService.getOptions(user.email, 'ComOt recipt email', 'recipt', { 
        name: `${user.first_name} ${user.last_name}`, 
        recipt_number: recipt.recipt_number, 
        amount: transaction.amount,
        date: getDate(recipt.date_time)
       });
      this.getTransporter('recipt').sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('ERROR' + error);
        } else {
          console.log('Email sent: ' + info.response); 
        }
      });
    }


    public static sendGeneralMessage(mailData: ISendEmail) {
      var mailOptions = EmailService.getOptions(mailData.emails.join(';'), 'ComOt general email', 'genmail', { 
        message: mailData.message
       });
      this.getTransporter('genmail').sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('ERROR' + error);
        } else {
          console.log('Email sent: ' + info.response); 
        }
      });
    }
    
    public static testEMail() {
  
          var mailOptions = EmailService.getOptions('asscobara@gmail.com', 'Sending Email using Node.js - COMOT test by myself', 'Test 1234 Hello!', 'verify');
          
          this.getTransporter('verift').sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
    
}

export default EmailService;