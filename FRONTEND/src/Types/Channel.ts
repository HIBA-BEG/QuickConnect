
export type MembersType ={
    firstName : string;
    lastName : string;
    username : string
    email : string;
    lastSeen :string;
    status : string;
   }
export interface Channel {
    _id : string;
    name : string;
    description : string;
    members : MembersType[];
    bannedWords: string[];
    type: 'Private' | 'Public' | 'Conversation';
    moderator: string;


}