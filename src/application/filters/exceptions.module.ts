import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { FiltersController } from './filters.controller';

/**
 * The ExceptionsModule registers the HttpExceptionFilter globally ('Nest Way')
 * using the APP_FILTER provider token.
 *
 * Why is this better than app.useGlobalFilters() in main.ts?
 * ---------------------------------------------------------
 * - It allows you to inject any required dependencies (e.g., loggers, DB connections)
 *   into your filter via constructor injection.
 * - It keeps main.ts clean and modular.
 * - It enables easier testing and configuration.
 */
@Module({
  controllers: [FiltersController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [],
})
export class ExceptionsModule {}
