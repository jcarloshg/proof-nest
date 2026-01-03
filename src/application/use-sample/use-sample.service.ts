import { Injectable, Logger } from '@nestjs/common';
import { SampleService } from '../sample/sample.service';

@Injectable()
export class UseSampleService {
  constructor(private readonly sampleService: SampleService) {
    const config = this.sampleService.getConfig();
    Logger.log('SampleService config:', JSON.stringify(config));
  }

  printSampleConfig(): void {
    const config = this.sampleService.getConfig();
    Logger.log('SampleService config:', JSON.stringify(config));
  }

  getSampleConfig() {
    return this.sampleService.getConfig();
  }
}
