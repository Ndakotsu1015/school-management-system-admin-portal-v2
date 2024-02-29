import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { config } from 'aws-sdk';
import { join } from 'path';
import { AppModule } from './app/app.module';
import { PrismaService } from './app/prisma/prisma.service';
import { HttpExceptionFilter } from './app/api/exception-filter/http-exception.filter';
import { PrismaExceptionFilter } from './app/api/exception-filter/prisma-exception.filter';

async function bootstrap() {
  // let httpsOptions = {};
  console.log('point 1');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // httpsOptions: httpsOptions,
    cors: true,
  });
  console.log('point 2');
  // Set Global Prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Express-specific
  const finalPath = join(process.cwd(), 'apps/api/public');
  app.useStaticAssets(finalPath);

  //Http-exception-filter
  app.useGlobalFilters(new HttpExceptionFilter());

  //Http-exception-filter
  app.useGlobalFilters(new PrismaExceptionFilter());

  // Set Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // Setup AWS Config Object
  const configService = app.get(ConfigService);
  // config.update({
  //   accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
  //   secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
  //   region: configService.get('AWS_REGION'),
  // });

  // Register Prisma Shutdown Hooks
  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);

  // Set Global Interceptors
  // app.useGlobalInterceptors(new RequestBodyLoggerInterceptor());

  // const docsConfig = new DocumentBuilder()
  //   .setTitle('Monita API')
  //   .setDescription('The Monita API documentation')
  //   .setVersion('1.0')
  //   .addTag('monita')
  //   .build();
  // const document = SwaggerModule.createDocument(app, docsConfig);
  // SwaggerModule.setup('docs', app, document, {
  //   customSiteTitle: 'Monita API Docs',
  // });

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
