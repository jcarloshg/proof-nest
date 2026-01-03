import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestService {
  log(message: string) {
    console.log(`[RequestService] ${message}`);
  }
}
