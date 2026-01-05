import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * RequestLoggerMiddleware
 *
 * Implements NestMiddleware to handle request enrichment and logging.
 */
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  /**
   * The 'use' method is the entrypoint for Class-based middleware in NestJS.
   *
   * @param req - Incoming HTTP request object (Extended: can be modified directly)
   * @param res - HTTP response object (rarely used for logic here)
   * @param next - Callback to pass control to next middleware/handler
   */
  use(req: Request, res: Response, next: NextFunction): void {
    // Extract request data
    const { method, originalUrl, headers } = req;
    const userAgent = headers['user-agent'];

    // Add custom property to req object: x-request-id using timestamp (could use uuid instead)
    req['x-request-id'] = Date.now().toString();

    // Log key request information (production apps should use logging service)
    console.log(`[Request-Logger] ${method} ${originalUrl}`);
    console.log(`User-Agent: ${userAgent}`);
    console.log(`x-request-id set to: ${req['x-request-id']}`);

    // Continue to next middleware/controller/handler
    next();
  }
}
