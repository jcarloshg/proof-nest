import { Module } from '@nestjs/common';
import { LoggingModule } from './application/middleware/logging.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './application/auth/auth.module';
import { NotificationModule } from './application/notification/notification.module';

import { UseSampleModule } from './application/use-sample/use-sample.module';
import { SampleModule } from './application/sample/sample.module';
import { RequestModule } from './application/request/request.module';
import { AccessControlModule } from './application/guards/access-control.module';
import { InterceptorsModule } from './application/interceptors/interceptors.module';
import { PipesExampleModule } from './application/pipes-example/pipes-example.module';

import { ExceptionsModule } from './application/filters/exceptions.module';
import { DiscoveryModule } from './application/discovery/discovery.module';

@Module({
  imports: [
    AuthModule,
    NotificationModule,
    LoggingModule,
    SampleModule.forRoot({
      apiKey: 'my-api-key',
      endpoint: 'https://api.example.com',
    }),
    UseSampleModule,
    RequestModule,
    AccessControlModule,
    InterceptorsModule,
    PipesExampleModule,
    ExceptionsModule,
    DiscoveryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
