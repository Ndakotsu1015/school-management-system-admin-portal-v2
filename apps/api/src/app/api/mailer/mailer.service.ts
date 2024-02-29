import { SendMailDto, SendProcurementMailDto, SendVerificationMailDto } from '@nti-idcard-platform/api-interfaces';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly config: ConfigService,
  ) { }
  getData(): { message: string } {
    return { message: 'Welcome to mailer-api!' };
  }

  async sendMail(payload: SendMailDto) {
    payload.recipients.forEach(async (recipient) => {
      await this.mailerService.sendMail({
        to: recipient.email_address,
        from: this.config.get('MAILER_USER'),
        subject: payload.subject,
        template: 'email-template',
        context: {
          payload: payload
        }
      });
    });
    return 'success'
  }

  async sendVerificationMail(payload: SendVerificationMailDto) {
    await this.mailerService.sendMail({
      to: payload.recipient,
      from: this.config.get('MAILER_USER'),
      subject: payload.subject,
      template: 'email-verification-template',
      context: {
        payload: payload
      }
    });
    return 'success'
  };

  async sendProcurementMail(payload: SendProcurementMailDto) {
    payload.recipients.forEach(async (recipient) => {
      await this.mailerService.sendMail({
        to: recipient.email_address,
        from: this.config.get('MAILER_USER'),
        subject: payload.subject,
        template: 'procurement-template',
        context: {
          payload: payload
        }
      })
    });
    return "success"
  }

  async sendDefaultMail(payload: SendProcurementMailDto) {
    payload.recipients.forEach(async (recipient) => {
      await this.mailerService.sendMail({
        to: recipient.email_address,
        from: this.config.get('MAILER_USER'),
        subject: payload.subject,
        template: 'default-template',
        context: {
          payload: payload
        }
      })
    });
    return "success"
  }
}
