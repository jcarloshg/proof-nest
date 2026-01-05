// MockUserMiddleware: Injects a fake user object onto each request for testing/demo
// No real authentication; allows you to simulate user roles in development
// Change the `roles` array to test admin/customer/etc. endpoints

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Extend Express's Request type (TypeScript) to allow 'user' property
// (This fixes TS errors about req.user not existing)
declare module 'express' {
  interface Request {
    user?: any;
  }
}

@Injectable()
export class MockUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`req: `, req.user);
    // req.user = { roles: ['user'] }; // Change to ['admin'] to test /admin endpoint!
    req.user = { roles: ['admin'] };
    next();
  }
}
