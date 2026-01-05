// Custom Pipe: Validates and transforms file size input.
// If size > 10MB, throws BadRequestException; otherwise returns size as number.

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizePipe implements PipeTransform {
  transform(value: any) {
    const num = Number(value);
    // Check for valid number type
    if (isNaN(num)) {
      throw new BadRequestException('File size must be a number');
    }
    if (num > 10 * 1024 * 1024) {
      throw new BadRequestException('File size cannot exceed 10MB');
    }
    return num;
  }
}
