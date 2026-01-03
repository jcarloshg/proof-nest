import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { BService } from './b.service';

@Injectable()
export class AService {
  constructor(
    @Inject(forwardRef(() => BService))
    private readonly bService: BService,
  ) {}
  // ...business logic
}
