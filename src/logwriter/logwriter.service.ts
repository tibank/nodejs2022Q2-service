import { Inject, Injectable } from '@nestjs/common';
import { join, resolve } from 'path';
import { cwd } from 'process';
import { mkdir, access } from 'fs/promises';
import { createWriteStream } from 'fs';

@Injectable()
export class LogWriter {
  private logDir: string;
  private logSize: number;
  private logPrefix: string;
  private logCurrentSize: number;

  constructor(
    @Inject('LOGPREFIX') logPrefix: string,
    @Inject('LOGSIZE') logSize: number,
  ) {
    this.logDir = 'log';
    this.logPrefix = process.env.LOG_FILE_PREFIX || logPrefix;
    this.logSize = +process.env.LOG_MAX_SIZE || logSize;
    this.logCurrentSize = 0;

    this.createLogDir();
  }

  private async createLogDir(): Promise<void> {
    const dir = join(`${cwd()}`, this.logDir);
    try {
      await access(this.logDir);
    } catch (error) {
      await mkdir(this.logDir);
    }
  }

  public async writeToFile(message: string): Promise<void> {
    const fileName = resolve(join(this.logDir, this.logPrefix + '.log'));
    const writable = createWriteStream(fileName, {
      encoding: 'utf8',
      flags: 'a',
    });

    this.logCurrentSize += message.length;
    console.log('log size ' + this.logCurrentSize);
    writable.write(message);
  }
}
