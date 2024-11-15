import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { FriendRequest, FriendRequestSchema } from './entities/friend-request.entity';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: FriendRequest.name, schema: FriendRequestSchema },
        ]),
        UserModule,
    ],
    controllers: [FriendRequestController],
    providers: [FriendRequestService],
})
export class FriendRequestModule {}
