import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './transform.interceptor';
import { TimeoutInterceptor } from './timeout.interceptor';
import { DemoController } from './demo.controller';

// The TransformInterceptor wraps all responses globally (via APP_INTERCEPTOR).
// The TimeoutInterceptor also runs globally; order matters - logging is outermost.

@Module({
  controllers: [DemoController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class InterceptorsModule {}
