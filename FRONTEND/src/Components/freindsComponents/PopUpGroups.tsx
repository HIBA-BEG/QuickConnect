import React, { useContext, useEffect, useState } from 'react'
import Groups from '../channelComponents/Groups';
import { ChannelContext } from '../../Contexts/ChannelContext';
import { Channel } from '../../Types/Channel';

export default function PopUpGroups({ onOpen, onClose , userId }: any) {

    const channelContext = useContext(ChannelContext);
    const channels = channelContext?.channels || [];

    const [groupId , setGroupId] = useState<string | number>()
    // console.log('groupId:',groupId, 'userId:',userId)

    if (!onOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

            <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] text-center">
                <div onClick={onClose} className='  flex justify-end w-full h-10 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg>
                </div>

                {channels.length > 0 ?


                    channels.map((item: Channel, index: number) => (
                        <div key={index} className='bg-gray-300 rounded-md flex justify-between items-center mb-2'>
                            <Groups name={item.name} />

                            <button onClick={()=>{setGroupId(item._id)}} className='mr-5 rounded-md font-medium text-white py-1 px-9 bg-green-600'>
                                Invit
                            </button>
                        </div>
                    ))

                    :
                    <div>
                        <p> No Groups Created</p>
                    </div>
                }

            </div>
        </div>
    )
}
