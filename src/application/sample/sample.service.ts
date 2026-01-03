import { Inject, Injectable } from '@nestjs/common';
import type { SampleModuleOptions } from './interfaces/sample-module-options.interface';

@Injectable()
export class SampleService {
  constructor(
    @Inject('SAMPLE_MODULE_OPTIONS')
    private readonly options: SampleModuleOptions,
  ) {}

  getConfig(): SampleModuleOptions {
    return this.options;
  }
}
