import { Module } from '@nestjs/common';
import { LogWriterModule } from 'src/logwriter/logwriter.module';
import { MyLoggerInterceptor } from './mylogger.interceptor';
import { MyLogger } from './mylogger.service';

@Module({
  imports: [LogWriterModule],
  providers: [MyLogger, MyLoggerInterceptor],
  exports: [MyLogger],
})
export class MyLoggerModule {}
