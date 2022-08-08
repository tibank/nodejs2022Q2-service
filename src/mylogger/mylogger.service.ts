import { Injectable, LoggerService } from '@nestjs/common';
import {
  isConsoleLogger,
  isFileLogger,
  isLogLevelEnabled,
} from './util.logger';
import { LogLevel } from './loglevels.type';
import { LogWriter } from 'src/logwriter/logwriter.service';

@Injectable()
export class MyLogger implements LoggerService {
  private context?: string;

  constructor(private readonly logWriterFile: LogWriter) {}

  setContext(context: string): void {
    this.context = context;
  }

  private getFormattedTimeStamp(): string {
    const localeStringOptions = {
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: '2-digit',
      month: '2-digit',
    };
    return new Date(Date.now()).toLocaleString(
      'en-GB',
      localeStringOptions as Intl.DateTimeFormatOptions,
    );
  }

  private getFormattedMessage(level: string, message: any): string {
    let formattedMessage = '';
    if (typeof message === 'object') {
      formattedMessage = '\n' + JSON.stringify(message, null, 2);
    } else {
      formattedMessage = message;
    }

    return `[Nest] ${this.getFormattedTimeStamp()} ${level} [${
      this.context
    }] ${formattedMessage}`;
  }

  private makeLog(level: LogLevel, message: any) {
    if (isLogLevelEnabled(level)) {
      const strMessage = this.getFormattedMessage(
        level.toLocaleUpperCase(),
        message,
      );
      if (isConsoleLogger()) {
        console.log(strMessage);
      }

      if (isFileLogger()) {
        this.logWriterFile.writeToFile(strMessage);
      }
    }
  }

  log(message: any) {
    this.makeLog('log', message);
  }
  error(message: any) {
    this.makeLog('error', message);
  }
  warn(message: any) {
    this.makeLog('warn', message);
  }
  debug?(message: any) {
    this.makeLog('debug', message);
  }
  verbose?(message: any) {
    this.makeLog('verbose', message);
  }
}
