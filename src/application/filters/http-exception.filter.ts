import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

/**
 * ExceptionFilter that intercepts all thrown HttpExceptions
 * and transforms them into a consistent JSON response.
 *
 * @Catch(HttpException) means this filter handles only HTTP related errors.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * Handles the exception and shapes the error response.
   *
   * @param exception - The HttpException instance thrown by NestJS.
   * @param host - Provides methods to access the platform-specific objects (request, response).
   *
   * host.switchToHttp() gives access to the underlying HTTP objects:
   * - .getRequest() retrieves the raw request object (Express/other adapter)
   * - .getResponse() retrieves the raw response object
   * - .getNext() retrieves the next middleware function (rarely used in filters)
   *
   * This design allows NestJS to remain framework-agnostic (works with Express, Fastify, etc).
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    // Access HTTP-specific objects from the execution context
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Extract status and message from the exception
    const status = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR;

    // Try to extract the message in the safest way possible
    const exceptionResponse = exception.getResponse?.();
    let message = exception.message;
    if (
      exceptionResponse &&
      typeof exceptionResponse === 'object' &&
      (exceptionResponse as any).message
    ) {
      message = (exceptionResponse as any).message;
    }
    if (Array.isArray(message)) {
      // Handle array of messages (e.g. validation errors)
      message = message.join('; ');
    }

    // Send a standardized JSON error structure
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      greeting: 'Hello from the exception filter!',
    });
  }
}
