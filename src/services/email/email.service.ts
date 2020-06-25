import * as nodemailer from 'nodemailer';
import { IUser } from 'interfaces/users.interface';

class EmailService {
    
    private static get transporter() {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'asscobara@gmail.com',
          pass: 'bagay1bagay1'
        }
      });
    }

    private static getOptions(destEmail: string, title: string, content: string) {
      return {
          from: 'asscobara@gmail.com',
          to: destEmail,
          subject: title,
          text: content
        };
    }

    public static sendVerificationEmail(user: IUser, url: string) {
      var mailOptions = EmailService.getOptions(user.email, 'COMOT verification email', `activate here: ${url}`);
      this.transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
    
    public static testEMail() {
  
          var mailOptions = EmailService.getOptions('levyhome2014@gmail.com', 'Sending Email using Node.js - COMOT test by myself', 'Test 1234 Hello!');
          
          this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
    
}

export default EmailService;