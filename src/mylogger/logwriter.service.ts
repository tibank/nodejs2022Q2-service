import { Injectable } from '@nestjs/common';
import path from 'path';
import { cwd } from 'process';

@Injectable()
export class LogWriterToFile {
  private logDir: string;
  private logSize: number;
  private logPrefix: string;

  constructor (logDir = 'log', logSize = 10, logPrefix = 'log-') {
      this.logDir = path.resolve(path.join(`${cwd()}`, logDir))
      this.logSize = logSize
      this.logPrefix = logPrefix


  }

  private async createLogDir(): Promise<void> {
    const logDir = path.resolve(path.join(`${cwd()}`, `log`));
  }
}
