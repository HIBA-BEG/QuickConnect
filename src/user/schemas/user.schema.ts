import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export enum UserStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
    BUSY = 'busy',
}

@Schema()
    export class User extends Document {

    @Prop({ required: true }) /* we use prop if we want to pass multiple values */
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    // @Prop()
    // password: string;

    @Prop()
    profilePicture: string;

    @Prop()
    phoneNumber: string;

    @Prop({ type: String, enum: UserStatus, default: UserStatus.OFFLINE })
    status: UserStatus;

    timestamps: true
    // @Prop()
    // channels: string;

    // @Prop() 
    // friends: string;

    // @Prop()
    // friendRequests: string;
}


export const UserSchema = SchemaFactory.createForClass(User);
