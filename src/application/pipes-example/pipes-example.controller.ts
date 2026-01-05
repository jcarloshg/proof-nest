// Demonstrates: 1) POST endpoint with DTO validation; 2) GET endpoint with custom pipe for query param.
import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { FileSizePipe } from './file-size.pipe';

@Controller('pipes-example')
export class PipesExampleController {
  // POST /pipes-example/create
  // - Uses DTO contract for validation.
  // - Only accepts fields defined in DTO, if global ValidationPipe is set as shown below.
  @Post('create')
  createUser(@Body() dto: CreateUserDto) {
    // At this point, dto is safe, validated, and of the correct shape.
    return { message: 'User created!', payload: dto };
  }

  // GET /pipes-example/file-size?size=1234
  // - Validates 'size' query param with FileSizePipe.
  @Get('file-size')
  getFileSize(@Query('size', FileSizePipe) size: number) {
    return { fileSize: size };
  }
}

/*
To enable robust validation with whitelist and error on extra fields, add this in main.ts:
-------------------------------------------------------------------
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // strip unrecognized fields
      forbidNonWhitelisted: true,   // throw 400 if unknown fields present
    })
  );
  await app.listen(3000);
}
-------------------------------------------------------------------
This guarantees only DTO fields are accepted by the API.
*/
