import { Inject, Injectable } from '@nestjs/common';
import { join, resolve } from 'path';
import { mkdir, access, writeFile } from 'fs/promises';
import { createWriteStream } from 'fs';

@Injectable()
export class LogWriter {
  private logDir: string;
  private logSize: number;
  private logPrefix: string;
  private currentFileName: string;
  private logCurrentSize: number;
  private currentNumberFile: number;

  constructor(
    @Inject('LOGPREFIX') logPrefix: string,
    @Inject('LOGSIZE') logSize: number,
  ) {
    this.logDir = 'log';
    this.logPrefix = process.env.LOG_FILE_PREFIX || logPrefix;
    this.logSize = +process.env.LOG_MAX_SIZE || logSize;
    this.logCurrentSize = 0;
    this.currentNumberFile = 0;
    this.currentFileName = this.getFileNameLog();

    this.createLogDir();
    writeFile(this.currentFileName, '');
  }

  private getFileNameLog() {
    return resolve(
      join(this.logDir, this.logPrefix + this.currentNumberFile + '.log'),
    );
  }

  private async createLogDir(): Promise<void> {
    try {
      await access(this.logDir);
    } catch (error) {
      await mkdir(this.logDir);
    }
  }

  private async write(message: string): Promise<void> {
    const writable = createWriteStream(this.currentFileName, {
      encoding: 'utf8',
      flags: 'a',
    });
    writable.write(message);
  }

  public async writeToFile(message: string): Promise<void> {
    if (this.logCurrentSize + message.length > this.logSize * 1024) {
      this.currentNumberFile++;
      this.currentFileName = this.getFileNameLog();
      this.logCurrentSize = 0;
      writeFile(this.currentFileName, '');
    }
    await this.write(message);
    this.logCurrentSize += message.length;
  }
}
