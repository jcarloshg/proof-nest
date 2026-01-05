// DemoController: Example endpoint to show interception/wrapping in action.

import { Controller, Get } from '@nestjs/common';

@Controller('demo')
export class DemoController {
  @Get('greet')
  greet(): string {
    return 'Hello from Interceptors!';
  }
}
