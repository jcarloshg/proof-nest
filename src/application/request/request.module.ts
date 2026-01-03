import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CorrelationIdMiddleware } from './middleware/correlation-id.middleware';
import { headerValidationMiddleware } from './middleware/header-validation.middleware';
import { RequestController } from './controller/request.controller';

@Module({
  providers: [RequestService, CorrelationIdMiddleware], // Register service and class-based middleware as providers
  controllers: [RequestController], // Register the controller
})
export class RequestModule implements NestModule {
  // Configure middleware for this module
  configure(consumer: MiddlewareConsumer) {
    consumer
      // Apply both the class-based and functional middleware in sequence
      .apply(CorrelationIdMiddleware, headerValidationMiddleware)
      // Exclude the /health GET route and /api/return-all-without-middleware GET route from middleware
      .exclude(
        { path: '/health', method: RequestMethod.GET },
        { path: 'api/return-all-without-middleware', method: RequestMethod.GET }
      )
      // Apply middleware to POST /api/test and GET /api/return-all
      .forRoutes(
        { path: 'api/test', method: RequestMethod.POST },
        { path: 'api/return-all', method: RequestMethod.GET }
      );
  }
}
