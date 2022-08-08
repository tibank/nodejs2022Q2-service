import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { MyLogger } from './mylogger.service';
import { Request } from 'express';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(private readonly logger: MyLogger) {
    super();
    this.logger.setContext('AllExceptionsFilter');
    process.on('uncaughtException', (err, origin) =>
      this.logger.error(
        `Caught exception: ${err}\n` + `Exception origin: ${origin}`,
      ),
    );
    process.on('unhandledRejection', (reason, promise) => {
      this.logger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
    });
  }

  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
    const req: Request = host.switchToHttp().getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message: any = {
      request: {
        url: req.originalUrl,
        method: req.method,
        parameters: req.params,
        body: req.body,
      },
      error: {
        status: httpStatus,
        message: exception,
      },
    };

    this.logger.error(message);
  }
}
