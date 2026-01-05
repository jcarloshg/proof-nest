import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RequestLoggerMiddleware } from './request-logger.middleware';
import { TestController } from './test.controller';

/**
 * LoggingModule manages all middleware related to logging and request enrichment.
 */
@Module({
  controllers: [TestController],
})
export class LoggingModule implements NestModule {
  /**
   * configure sets up the middleware for routes.
   *
   * @param consumer - MiddlewareConsumer provides a fluent API to control middleware application.
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware) // Apply middleware class
      .exclude(
        // Exclude /health GET route from the middleware
        { path: 'health', method: RequestMethod.GET },
      )
      .forRoutes('*'); // Apply to all routes by default
  }
}
