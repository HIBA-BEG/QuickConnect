import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserStatus } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    if (!users) {
      throw new NotFoundException('Users not found.');
    }
    return users;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    const res = await this.userModel.create({
      ...createUserDto,
      status: UserStatus.ONLINE,
      lastSeen: new Date(),
    });
    const user = await res.save();
    return user;
  }

  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { email: loginDto.email },
      {
        status: UserStatus.ONLINE,
        lastSeen: new Date(),
      },
      { new: true },
    );
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async logout(userId: string): Promise<void> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found.');
      }

      await this.userModel.findByIdAndUpdate(userId, {
        status: UserStatus.OFFLINE,
        lastSeen: new Date(),
      });
    } catch (error) {
      throw new Error(`Logout failed: ${error.message}`);
    }
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async updateById(id: string, user: UpdateUserDto): Promise<User> {
    const oneUser = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
    if (!oneUser) {
      throw new NotFoundException('User not found.');
    }
    return oneUser;
  }

  async deleteById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
