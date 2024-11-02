import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelSchema } from './entities/channel.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[MongooseModule.forFeature([{name:'Channel',schema:ChannelSchema}]) , UserModule],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
