import { Injectable, LoggerService, Optional, Scope } from '@nestjs/common';
import {
  isConsoleLogger,
  isFileLogger,
  isLogLevelEnabled,
} from './util.logger';
import path from 'path';
import { cwd } from 'process';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger implements LoggerService {
  private context?: string;

  constructor(@Optional() context: string) {
    this.context = context;
  }

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
    let formattedMessage: string = '';
    if (typeof message === 'object') {
      formattedMessage = JSON.stringify(message,null,2)
    } else {
      formattedMessage = message
    }

    return `[Nest] ${this.getFormattedTimeStamp()} ${level} 
            [${this.context}] ${formattedMessage}`;
  }

  log(message: any, ...optionalParams: any[]) {
    if (isLogLevelEnabled('log')) {
      if (isConsoleLogger()) {
        console.log(this.getFormattedMessage('LOG', message));
      }

      if (isFileLogger()) {
      }
    }
  }
  error(message: any, ...optionalParams: any[]) {}
  warn(message: any, ...optionalParams: any[]) {}
  debug?(message: any, ...optionalParams: any[]) {}
  verbose?(message: any, ...optionalParams: any[]) {}
}
