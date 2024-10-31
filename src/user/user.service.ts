import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import {Model} from 'mongoose';
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {}

    async findAll(): Promise<User[]>{
        const users = await this.userModel.find();
        return users;
    }

    async create(createUserDto: CreateUserDto): Promise<User>{
        console.log(createUserDto);
        const res = await this.userModel.create(createUserDto);
        const user = await res.save();
        return user;
    }
}
