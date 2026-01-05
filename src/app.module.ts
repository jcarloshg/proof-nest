import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './application/auth/auth.module';
import { NotificationModule } from './application/notification/notification.module';

import { UseSampleModule } from './application/use-sample/use-sample.module';
import { SampleModule } from './application/sample/sample.module';
import { RequestModule } from './application/request/request.module';
import { AccessControlModule } from './application/guards/access-control.module';

@Module({
  imports: [
    AuthModule,
    NotificationModule,
    SampleModule.forRoot({
      apiKey: 'my-api-key',
      endpoint: 'https://api.example.com',
    }),
    UseSampleModule,
    RequestModule,
    AccessControlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
