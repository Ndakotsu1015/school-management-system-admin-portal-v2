import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { MailController } from './mailer.controller';
import { MailService } from './mailer.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule, PrismaModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          service: config.get('MAILER_SERVICE'),
          auth: {
            user: config.get('MAILER_USER'),
            pass: config.get('MAILER_PASS')
          }
        },
        defaults: {
          from: '"KASUWA" <no-reply@kasuwa.com>',
        },
        template: {
          dir: join(__dirname, 'kasuwa-mail-template'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),

  ],
  controllers: [MailController],
  providers: [MailService, PrismaClient],
})
export class MailModule { }
