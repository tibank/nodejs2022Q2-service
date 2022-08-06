import { Module } from '@nestjs/common';
import { LogWriter } from './logwriter.service';

@Module({
  providers: [
    LogWriter,
    {
      provide: 'LOGSIZE',
      useValue: 10,
    },
    {
      provide: 'LOGPREFIX',
      useValue: 'nest-custom-log',
    },
    {
      provide: 'LOGDIR',
      useValue: 'log',
    },
  ],
  exports: [LogWriter],
})
export class LogWriterModule {}
