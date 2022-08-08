import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MyLogger } from './mylogger.service';
import { Request, Response } from 'express';

@Injectable()
export class MyLoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: MyLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        this.logger.setContext(MyLoggerInterceptor.name);

        const req: Request = context.switchToHttp().getRequest<Request>();
        const res: Response = context.switchToHttp().getResponse<Response>();
        const message: any = {
          request: {
            url: req.originalUrl,
            method: req.method,
            parameters: req.params,
            body: req.body,
          },
          response: {
            statusCode: res.statusCode,
          },
        };

        this.logger.log(message);
      }),
    );
  }
}
