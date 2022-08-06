import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from './mylogger.service';

@Injectable()
export class MyLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    const message: any = {
      request: {
        url: req.originalUrl,
        method: req.method,
        parameters: req.params,
        body: req.body,
      },
    };
    this.logger.setContext(MyLoggerMiddleware.name);
    this.logger.log(message);
    next();
  }
}
