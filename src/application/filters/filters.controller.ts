import { Controller, Get, BadRequestException } from '@nestjs/common';

/**
 * Controller to test how the HTTP exception filter behaves.
 */
@Controller('filters')
export class FiltersController {
  /**
   * GET /filters/error
   * This will always throw a BadRequestException,
   * which should be handled and formatted by HttpExceptionFilter.
   */
  @Get('error')
  throwError() {
    throw new BadRequestException('Something went wrong');
  }
}
