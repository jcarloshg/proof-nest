import { Injectable, Inject, Optional } from '@nestjs/common';

/**
 * @Injectable() marks this class as available for NestJS dependency injection.
 * The DiscoveryService will be instantiated and injected wherever needed.
 */
@Injectable()
export class DiscoveryService {
  /**
   * @Inject() allows for manual DI of a custom provider token.
   * @Optional() means the dependency is not required—Nest injects 'undefined' if not present.
   */
  constructor(
    @Inject('OPTIONAL_TOKEN')
    @Optional()
    private readonly maybe: string | undefined,
  ) {}

  getStatus(): string {
    return 'DiscoveryService is operational';
  }

  getOptionalValue() {
    return this.maybe || 'No injectable provided';
  }
}
