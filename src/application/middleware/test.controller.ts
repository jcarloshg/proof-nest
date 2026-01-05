import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

/**
 * TestController
 *
 * Simple controller to test middleware enrichment of request object.
 */
@Controller('test')
export class TestController {
  @Get()
  getXRequestId(@Req() req: Request) {
    // Return the value set by the middleware for validation.
    return {
      message: 'Middleware test successful',
      xRequestId: req['x-request-id'] || null,
    };
  }
}
