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

  // ======================findALL=======================

  async findAll(): Promise<Channel[]> {
    const allChannel = await this.channelModel
      .find()
      .populate('moderator')

    if (!allChannel) {
      throw new NotFoundException('no data available')
    }
    return allChannel
  }

  // ==============================create=====================

  async create(createChannelDto: CreateChannelDto): Promise<Channel> {
    const { moderator, members } = createChannelDto;

    // type de id il faut etre ObjectId
    if (moderator && !Types.ObjectId.isValid(moderator)) {
      throw new BadRequestException(`Invalid moderator ID format`);
    }

    // verifier si le moderator existe :)
    if (moderator) {
      const isModeratorExists = await this.userModel.findById(moderator);

      if (!isModeratorExists) {
        throw new NotFoundException(`Moderator with ID ${moderator} not found`);
      }
    }

    // ajouter les membre sous forme de nested documente
    const memberDocs = [];
    if (members) {
      for (const memberId of members) {


        const memberExists = await this.userModel.findById(memberId);
        if (!memberExists) {
          throw new NotFoundException(`Member with ID ${memberId} not found`);
        }

        memberDocs.push({
          _id: memberId,
          firstName: memberExists.firstName,
          lastName: memberExists.lastName,
          username: memberExists.username,
          email: memberExists.email,
          profilePicture: memberExists.profilePicture,
          status: memberExists.status,
          phoneNumber: memberExists.phoneNumber,
          lastSeen: memberExists.lastSeen,

        });
      }
    }

    const response = new this.channelModel({
      ...createChannelDto,
      moderator,
      members: memberDocs,
    });

    const channel = await response.save()
    return channel;
  }

  // ==========================update===================
  async update(id: string, updateChannelDto: UpdateChannelDto): Promise<Channel> {
    const { members } = updateChannelDto;
    let memberDocs = [];
    if (members) {
      for (const memberId of members) {

        // Optionnel : vérifier si chaque membre existe dans la base de données
        const memberExists = await this.userModel.findById(memberId);
        if (!memberExists) {
          throw new NotFoundException(`Member with ID ${memberId} not found`);
        }

        // Ajout de membre au tableau
        memberDocs.push({
          _id: memberId,
          firstName: memberExists.firstName,
          lastName: memberExists.lastName,
          username: memberExists.username,
          email: memberExists.email,
          profilePicture: memberExists.profilePicture,
          status: memberExists.status,
          phoneNumber: memberExists.phoneNumber,
          lastSeen: memberExists.lastSeen
        });
      }
    }


    const updateData = { ...updateChannelDto };


    if (members) {
      updateData.members = memberDocs;
    }

    const channelUpdate = await this.channelModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!channelUpdate) {
      throw new NotFoundException('Channel not found');
    }

    return channelUpdate;
  }

  // ==================find by id=====================
  async findById(id: string): Promise<Channel> {
    const channel = await this.channelModel.findById(id);

    if (!channel) {
      throw new NotFoundException('channel not found.');
    }
    return channel;
  }
  // ==========================delete ===================

  async delete(id: string): Promise<Channel> {
    return await this.channelModel.findByIdAndDelete(id);
  }
}
