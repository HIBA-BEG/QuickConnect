import React, { ReactNode, useEffect, useState,createContext } from "react";
import { getChannels } from "../Api/channelAPI/channelApi";
import { Channel } from "../Types/Channel";

interface ChannelContextType {
    channels: Channel[] | null;
     
}

export const ChannelContext = createContext<ChannelContextType | undefined>(undefined);

interface ChannelProviderProps {
    children: ReactNode;
  }
 const ChannelProvider : React.FC<ChannelProviderProps> = ({children}) => {
    const [channels, setChannels] = useState<Channel[] | null>(null);

    const fetchChannels = async()=>{
            const data = await getChannels();
            setChannels(data);
    }
    
    useEffect(()=>{
        fetchChannels()
    },[])

    const value = {
        channels
      };

    

    return (
        <ChannelContext.Provider value={value}>
            {children}
        </ChannelContext.Provider>
    );
}

export default ChannelProvider;