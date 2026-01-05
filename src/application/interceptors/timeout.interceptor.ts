// Interceptor: Logs execution time for each request.
// RxJS 'tap' is used for side effects - it lets us perform logging
// without modifying the outgoing data stream.

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;
    console.log(`[Request] ${method} ${url}`);
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - start;
        console.log(`[ResponseTime] ${method} ${url}: ${elapsed}ms`);
      }),
    );
  }
}
