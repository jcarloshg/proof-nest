import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Headers,
  Ip,
  HttpCode,
  Header,
  UseGuards,
  UseInterceptors,
  UsePipes,
  CanActivate,
  ExecutionContext,
  Injectable as InjectableClass,
  CallHandler,
  NestInterceptor,
  PipeTransform,
  ArgumentMetadata,
} from '@nestjs/common';
import { DiscoveryService } from './discovery.service';
import { User } from './decorators/user.decorator';
import { Observable } from 'rxjs';

// Dummy Guard, Interceptor, and Pipe just for reference and linting
@InjectableClass()
class DemoGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Normally, check request.user or some auth logic
    context.switchToHttp().getRequest().user = { email: 'test@example.com' }; // Set mock user
    return true;
  }
}

@InjectableClass()
class DemoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Just calls next
    return next.handle();
  }
}

@InjectableClass()
class DemoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Add/modify payload
    return { ...value, piped: true };
  }
}

/**
 * @Controller() registers this class as a controller that handles incoming HTTP requests.
 * The prefix ('discovery') means all routes are mounted under /discovery.
 */
@Controller('discovery')
export class DiscoveryController {
  /**
   * The DiscoveryService is injected by the DI container.
   */
  constructor(private readonly discoveryService: DiscoveryService) {}

  /**
   * @Get() is a method (routing) decorator, mapping GET /discovery/status requests.
   * It triggers after guards and interceptors but before pipes and the route handler.
   */
  @Get('status')
  getStatus() {
    return this.discoveryService.getStatus();
  }

  /**
   * @Post() handles POST requests to /discovery/data.
   * @Body() extracts and parses the request body.
   * @HttpCode(201) sets the HTTP status code for successful response.
   * @Header() adds custom headers to the response.
   */
  @Post('data')
  @HttpCode(201) // Sets response code (defaults to 201 for POST)
  @Header('X-Discovery', 'NestDecoratorDemo')
  postData(
    @Body() body: any, // @Body() extracts incoming request payload.
    @Headers('user-agent') userAgent: string, // @Headers() gets a header value.
    @Ip() ip: string, // @Ip() injects the client's IP address.
  ) {
    return {
      received: body,
      userAgent,
      ip,
    };
  }

  /**
   * @Get(':id') maps to GET /discovery/1234 URLs.
   * @Param() injects URL path variables.
   * @Query() injects query string parameters.
   */
  @Get('test-params/:id')
  getById(
    @Param('id') id: string, // Extracts :id from path.
    @Query('verbose') verbose: string, // Pulls ?verbose=...
  ) {
    return { id, verbose };
  }

  /**
   * @UseGuards() runs before all other request pipeline steps.
   */
  @Get('guarded')
  @UseGuards(DemoGuard)
  guarded(@User() user: any) {
    return { message: 'You passed the guard!', user };
  }

  /**
   * @UseInterceptors() runs AFTER guards but BEFORE route handler and pipes.
   */
  @Get('intercepted')
  @UseInterceptors(DemoInterceptor)
  intercepted() {
    return { message: 'This was intercepted.' };
  }

  /**
   * @UsePipes() applies transformations/validations BEFORE route handler.
   */
  @Post('validate')
  @UsePipes(DemoPipe)
  postValidate(@Body() parsed: any) {
    return { parsed };
  }
}
