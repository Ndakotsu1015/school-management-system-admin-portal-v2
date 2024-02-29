import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as otplib from 'otplib';

@Injectable()
export class OtpGeneratorService {
  constructor(private readonly configService: ConfigService) { }

  generate(length = 4) {
    const secret = this.configService.get('OTPLIB_SECRET');
    const authenicator = otplib.authenticator;
    authenicator.options = { digits: length };
    return authenicator.generate(secret);
  }

}
