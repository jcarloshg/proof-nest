

import { Module } from '@nestjs/common';
import { UseSampleService } from './use-sample.service';
import { UseSampleController } from './use-sample.controller';

@Module({
  providers: [UseSampleService],
  controllers: [UseSampleController],
})
export class UseSampleModule {}
