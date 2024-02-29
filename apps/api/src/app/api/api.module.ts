import { Module } from "@nestjs/common";

import { MailModule } from './mailer/mailer.module';

@Module({
  imports: [
    MailModule
  ],
})
export class ApiModule { }
