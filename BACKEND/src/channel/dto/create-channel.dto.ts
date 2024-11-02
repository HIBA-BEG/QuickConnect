import { IsArray, IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { ChannelType } from "../entities/channel.entity";
import { Types } from "mongoose";
export class CreateChannelDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsEnum(ChannelType)
    type?: ChannelType;

    @IsOptional()
    @IsArray()
    bannedWords?: string[];

    @IsOptional()
    @IsDate()
    scheduledTime?: Date;

    @IsOptional()
    @IsDate()
    expirationTime?: Date;

    @IsOptional()
    moderator: Types.ObjectId;



}
