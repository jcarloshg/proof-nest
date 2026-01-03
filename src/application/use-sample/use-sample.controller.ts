import { Controller, Get } from '@nestjs/common';
import { UseSampleService } from './use-sample.service';

@Controller('use-sample')
export class UseSampleController {
  constructor(private readonly useSampleService: UseSampleService) {}

  @Get('config')
  getConfig() {
    return this.useSampleService.getSampleConfig();
  }
}
