import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('/register')
  async createUser(
    @Body()
    user: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(user);
  }

  @Post('/login')
  async login(
    @Body()
    loginDto: LoginDto,
  ): Promise<User> {
    return this.userService.login(loginDto);
  }

  
  @Post('/logout')
  async logout(
    @Body('userId') userId: string,
  ): Promise<{ message: string }> {
    try {
      await this.userService.logout(userId);
      return { message: 'Logged out successfully' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Logout failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.findById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id')
    id: string,
    @Body()
    user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateById(id, user);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.deleteById(id);
  }

  @Get(':userId/friends')
  async getFriends(@Param('userId') userId: string) {
    try {
      return await this.userService.getFriends(userId);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch friends',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
}
