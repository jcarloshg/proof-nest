import { Module, Global } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';
import { DiscoveryController } from './discovery.controller';

/**
 * @Global() makes this module globally available (optional, shown for class decorator usage).
 */
@Global()
@Module({
  controllers: [DiscoveryController],
  providers: [
    DiscoveryService,
    // Optionally provide an override for the manual DI demo:
    // { provide: 'OPTIONAL_TOKEN', useValue: 'Injected value' },
  ],
  exports: [DiscoveryService],
})
export class DiscoveryModule {}
