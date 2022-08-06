import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { cwd } from 'process';
import { ValidationPipe } from '@nestjs/common';
import { MyLoggerInterceptor } from './mylogger/mylogger.interceptor';
import { MyLogger } from './mylogger/mylogger.service';
import { LogWriter } from './logwriter/logwriter.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const DOC_API = await readFile(resolve(cwd(), 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}

bootstrap();
