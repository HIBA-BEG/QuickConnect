import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from './entities/channel.entity';
import { User } from 'src/user/entities/user.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ChannelService {

  constructor(
    @InjectModel(Channel.name) private channelModel: Model<Channel>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }



  async create(createChannelDto: CreateChannelDto): Promise<Channel> {
    const { moderator } = createChannelDto;
    
    // type de id il faut etre ObjectId
    if (moderator && !Types.ObjectId.isValid(moderator)) {
      throw new BadRequestException(`Invalid moderator ID format`);
    }

    // verifier si le moderato existe :)
    if (moderator) {
      const isModeratorExists = await this.userModel.findById(moderator);

      if (!isModeratorExists) {
        throw new NotFoundException(`Moderator with ID ${moderator} not found`);
      }
    }
    const response = await this.channelModel.create(createChannelDto);
    const channel = await response.save()
    return channel;
  }
}
