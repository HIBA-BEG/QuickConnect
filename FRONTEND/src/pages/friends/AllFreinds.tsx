import React from 'react'
import Sidebar from '../../Components/Sidebar'
import Friend from '../../Components/freindsComponents/Friend'

export default function AllFreinds() {
    return (
        <div className='bg-[#2C2F33] flex '>

            <Sidebar />
            <div className='felx-1 justify-center '>

                <div className=' my-5  bg-white w-[92vw] min-h-[95vh]  rounded-[30px]'>
                    <div className='w-full flex justify-around items-center h-20 '>

                        <p className='text-3xl font-medium text-black'>All <span className='text-gray-800'>Freinds</span></p>
                        <div className='flex items-center rounded-3xl px-5 border border-gray-600 '>
                            <input type="text" className='w-96 h-11 outline-none pl-4 ' placeholder='Search...' />
                            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512"><path fill="#1e3050" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                        </div>

                    </div>

                    <div className='w-[100%] min-h-[84vh] grid grid-cols-3'>
                        <Friend/>
                        <Friend/>
                        <Friend/>
                        <Friend/>
                        <Friend/>
                             
                    </div>
                </div>


            </div>
        </div>
    )
}
