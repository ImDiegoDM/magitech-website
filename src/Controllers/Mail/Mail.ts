import { Request, Response, Router } from 'express';
import * as nodemailer from 'nodemailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import { validate } from '../../utils/validate';
import { IController } from '../Interfaces';

export class MailController implements IController {

  private transporter: any;

  constructor() {
    const smtpconfig: SMTPTransport.Options = {
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    };

    this.transporter = nodemailer.createTransport(smtpconfig);
  }

  public mapRoutes(router: Router) {
    const validateRules = {
      name: 'required',
      email: 'required',
      message: 'required',
    };
    router.post('/mail/website-contact', validate(validateRules), this.sendContact.bind(this));
  }

  public async sendContact( request: Request, response: Response) {
    const body = request.body;
    const mailOptions = {
      from: '"WebSite" <contato@diegomatias.com.br>', // sender address
      to: 'dm.diego.bh@gmail.com', // list of receivers
      subject: 'Contato a partir do site ', // Subject line
      text: `Nome: ${body.name}\nEmail: ${body.email}\nMensagem: ${body.message}
      `, // plain text body
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
    } catch (err) {
      response.status(500).send({error: 'ops a error ocurred'});
    }

    response.send('message sended');
  }

}
