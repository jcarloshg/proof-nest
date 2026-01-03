import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RequestService } from '../request.service';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(private readonly logger: RequestService) {}

  use(req: any, res: any, next: () => void) {
    const correlationId = uuidv4();
    req['x-correlation-id'] = correlationId;
    this.logger.log(`Correlation ID set: ${correlationId}`);
    next();
  }
}
