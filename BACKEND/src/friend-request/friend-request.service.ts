import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { FriendRequest, RequestStatus } from './entities/friend-request.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectModel(FriendRequest.name)
    private friendRequestModel: Model<FriendRequest>,
  ) { }

  async create(createFriendRequestDto: CreateFriendRequestDto): Promise<FriendRequest> {

    const existingRequest = await this.friendRequestModel.findOne({
      from: createFriendRequestDto.from,
      to: createFriendRequestDto.to,
      status: RequestStatus.PENDING
    });

    if (existingRequest) {
      throw new HttpException(
        'Friend request already exists',
        HttpStatus.BAD_REQUEST
      );
    }

    const newRequest = new this.friendRequestModel({
      ...createFriendRequestDto,
      status: RequestStatus.PENDING,
    });
    return await newRequest.save();
  }

  async findAll(): Promise<FriendRequest[]> {
    return this.friendRequestModel.find().populate('from to');
  }

  async findPendingRequests(userId: string): Promise<FriendRequest[]> {
    return this.friendRequestModel.find({
      to: userId,
      status: RequestStatus.PENDING,
    }).populate('from to');
  }

  async updateStatus(id: string, status: RequestStatus): Promise<FriendRequest> {
    const request = await this.friendRequestModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!request) {
      throw new NotFoundException('Friend request not found');
    }
    return request;
  }
}
