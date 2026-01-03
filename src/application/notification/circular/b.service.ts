import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AService } from './a.service';

@Injectable()
export class BService {
  constructor(
    @Inject(forwardRef(() => AService))
    private readonly aService: AService,
  ) {}
  // ...business logic
}
