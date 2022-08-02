import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from './mylogger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor (private readonly logger: MyLogger) {

  }
  use(req: Request, res: Response, next: NextFunction) {
    const message:any = {
      url: req.originalUrl,
      method: req.method,
      parameters: req.params,
      body: req.body,
    }
    this.logger.log(message)
    next();
  }
}
