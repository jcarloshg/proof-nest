import { DynamicModule, Global, Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleModuleOptions } from './interfaces/sample-module-options.interface';

/**
 * Dynamic modules allow configuration at import time, making them reusable and flexible.
 * This is preferred for libraries (e.g., DB wrappers) over hard-coding values.
 */
@Global() // Makes this module global (see explanation below)
@Module({
  providers: [SampleService],
  exports: [SampleService],
})
export class SampleModule {
  static forRoot(options: SampleModuleOptions): DynamicModule {
    return {
      module: SampleModule,
      providers: [
        {
          provide: 'SAMPLE_MODULE_OPTIONS',
          useValue: options,
        },
        SampleService,
      ],
      exports: [SampleService],
      global: true, // Also marks as global (alternative to @Global())
    };
  }
}
