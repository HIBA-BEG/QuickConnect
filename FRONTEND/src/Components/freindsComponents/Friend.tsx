import React, { useState } from 'react'
import PopUpGroups from './PopUpGroups'

export default function Friend() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {

        setIsPopupOpen( !isPopupOpen );
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    return (

        <div className="ml-9 mb-6 w-96 h-48 bg-white shadow-lg rounded-lg  overflow-hidden">

            <div className="bg-blue-500 h-24 flex items-center justify-start relative">
                <div className="w-20 h-20 bg-white rounded-full overflow-hidden absolute bottom-[-30px]">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile Picture"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className='flex justify-around items-center'>

                <div className="pt-10 pb-4 px-4 ">
                    <h2 className="text-lg font-semibold text-gray-800">Sophia Lee</h2>
                    <p className="text-sm text-gray-500">Student at Harvard</p>
                </div>
                <div className="px-4 py-2 ">
                    <button onClick={handleOpenPopup} className="text-sm bg-green-600 hover:bg-green-700 text-white font-semibold border rounded-md py-1 px-2 mr-2">Invit <span className='font-bold'>+</span></button>
                    <button className="text-sm bg-gray-400 hover:bg-gray-500 text-white font-semibold border rounded-md py-1 px-2">Add Friend</button>

                </div>
            </div>

            <PopUpGroups
                onOpen={isPopupOpen}
                onClose={handleClosePopup}
            />




        </div>

    )
}
