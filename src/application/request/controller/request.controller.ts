import { Controller, Get, Post, Req } from '@nestjs/common';

@Controller('api')
export class RequestController {
  @Post('test')
  test(@Req() req) {
    return {
      message: 'Request received',
      correlationId: req['x-correlation-id'] || null,
      apiKey: req.headers['x-api-key'] || null,
    };
  }

  @Get('return-all')
  returnAll(@Req() req) {
    return {
      headers: req.headers,
      body: req.body,
      method: req.method,
      url: req.url,
    };
  }

  @Get('return-all-without-middleware')
  returnAllWithoutMiddleware(@Req() req) {
    return {
      headers: req.headers,
      body: req.body,
      method: req.method,
      url: req.url,
    };
  }
}
