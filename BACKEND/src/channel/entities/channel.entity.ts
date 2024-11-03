import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Message } from "src/message/entities/message.entity";
import { User } from "src/user/entities/user.entity";

export enum ChannelType {
    PRIVATE = 'Private',
    PUBLIC = 'Public',
    CONVERSATION = 'Conversation',
}

export enum UserStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
    BUSY = 'busy',
}

//   ===============nested document of user==================
@Schema()
class Member {
    @Prop({ required: true })
    _id: string

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;


    @Prop()
    profilePicture: string;

    @Prop()
    phoneNumber?: string;

    @Prop({ type: String, enum: UserStatus, default: UserStatus.OFFLINE })
    status: UserStatus;

    @Prop({ default: Date.now })
    lastSeen: Date;
}

const MemberSchema = SchemaFactory.createForClass(Member);

// =====================channel schema=================
@Schema({ timestamps: true })
export class Channel extends Document {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop({ type: [MemberSchema],unique: false })
    members: Member[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
    messages: Message[];

    @Prop([String])
    bannedWords: string[];


    @Prop({ type: String, enum: ChannelType, default: ChannelType.PUBLIC })
    type: ChannelType;

    @Prop()
    expirationTime?: Date;

    @Prop()
    scheduledTime?: Date;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    moderator: User;

}

export const ChannelSchema = SchemaFactory.createForClass(Channel)
