import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { EbulkServiceRequest } from './ebulk-service.request';
import { EbulkSendSmsResponse } from './ebulk-send-sms.response';
import { ConfigService } from '@nestjs/config';
import {
  EBULKSMS_API_KEY,
  EBULKSMS_SENDER_NAME,
  EBULKSMS_USERNAME,
} from './constants';
import { lastValueFrom } from 'rxjs';
import { AbstractSMSProvider } from '../sms/sms.interface';

@Injectable()
export class EbulkSmsService implements AbstractSMSProvider {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async sendSMS(phone: string, text: string): Promise<void> {
    await this.sendServiceRequest({
      SMS: {
        auth: {
          apikey: this.configService.get(EBULKSMS_API_KEY),
          username: this.configService.get(EBULKSMS_USERNAME),
        },
        message: {
          sender: this.configService.get(EBULKSMS_SENDER_NAME),
          messagetext: text,
          flash: '0',
        },
        recipients: {
          gsm: [
            {
              msidn: phone,
              msgid: Date.now().toLocaleString() + 'p-' + phone,
            },
          ],
        },
        dndsender: 1,
      },
    });
  }

  private async sendServiceRequest(request: EbulkServiceRequest) {
    try {
      const request$ = await this.httpService.post<EbulkSendSmsResponse>(
        'https://api.ebulksms.com:4433/sendsms.json',
        request,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const response = await lastValueFrom(request$);

      console.log('[Ebulk SMS Provider]');
      console.log('Response: ', response.data);
      if (response.data.response.status != 'SUCCESS') {
        throw new InternalServerErrorException('SMS failed to send...');
      }
    } catch (err) {
      console.log(
        'An error occurred while attempting to send SMS via Provider: Ebulk SMS',
      );

      throw new InternalServerErrorException(err);
    }
  }
}
