// RBAC Module: Assembles role-guarded endpoints, the mock user provider, and all required providers.
// Applies the MockUserMiddleware to ALL routes in this module, so every request has a fake user injected.

import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GuardsController } from './guards.controller';
import { RolesGuard } from './roles.guard';
import { MockUserMiddleware } from './middleware/mock-user.middleware';

@Module({
  controllers: [GuardsController], // Exposes /public and /admin endpoints
  providers: [RolesGuard], // Provides the RBAC guard for endpoint use
})
export class AccessControlModule {
  configure(consumer: MiddlewareConsumer) {
    // Attach the mock user middleware to all routes here
    consumer
      .apply(MockUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
