import React, { useState } from 'react'
import PopUpGroups from './PopUpGroups'
import { User } from '../../Types/User';

interface UserProps {
    user: User;
  }
export default function SuggestionFreinds({ user }: UserProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [userId , setUserId] = useState<string | number>('')


    const handleOpenPopup = (id: string | number) => {
        setUserId(id)
        setIsPopupOpen( !isPopupOpen );
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    return (

        <div className="ml-9 mb-6 w-96 h-48 bg-white shadow-lg rounded-lg  overflow-hidden">

            <div className="bg-purple-500 h-24 flex items-center justify-start relative">
                <div className="w-20 h-20 bg-white rounded-full overflow-hidden absolute bottom-[-30px]">
                    <img
                        src="https://via.placeholder.com/150"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className='flex justify-around items-center'>

                <div className="pt-10 pb-4 px-4 ">
                    <h2 className="text-lg font-semibold text-gray-800">{user.firstName} {user.lastName}</h2>
                    <p className="text-sm text-gray-500">{user.username}</p>
                </div>
                <div className="px-4 py-2 ">
                    <button onClick={()=>handleOpenPopup(user._id)} className="text-sm bg-green-600 hover:bg-green-700 text-white font-semibold border rounded-md py-1 px-2 mr-2">Invit <span className='font-bold'>+</span></button>
                    <button className="text-sm bg-gray-400 hover:bg-gray-500 text-white font-semibold border rounded-md py-1 px-2">Add Friend</button>

                </div>
            </div>

            <PopUpGroups
                onOpen={isPopupOpen}
                onClose={handleClosePopup}
                userId={userId}
            />




        </div>

    )
}
