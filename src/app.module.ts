import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkModule } from './modules/link/link.module';
import { RedirectionModule } from './modules/redirection/redirection.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        dbName: configService.get('MONGO_DATABASE'),
        authSource: configService.get('MONGO_AUTH_SOURCE'),
        auth: {
          username: configService.get('MONGO_USERNAME'),
          password: configService.get('MONGO_PASSWORD'),
        },
      }),
    }),
    LinkModule,
    RedirectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
