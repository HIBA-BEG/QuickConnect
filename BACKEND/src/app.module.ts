import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelModule } from './channel/channel.module';
import { MessageModule } from './message/message.module';
import { NotificationModule } from './notification/notification.module';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { BanListModule } from './ban-list/ban-list.module';
import { RatingModule } from './rating/rating.module';
import { RewardModule } from './reward/reward.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    ChannelModule,
    MessageModule,
    NotificationModule,
    FriendRequestModule,
    BanListModule,
    RatingModule,
    RewardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
