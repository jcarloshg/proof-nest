import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './application/auth/auth.module';
import { NotificationModule } from './application/notification/notification.module';
import { SampleModule } from './application/sample/sample.module';

@Module({
  imports: [
    AuthModule,
    NotificationModule,
    SampleModule.forRoot({
      apiKey: 'my-api-key',
      endpoint: 'https://api.example.com',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
