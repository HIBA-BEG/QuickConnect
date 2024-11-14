import React from 'react'

export default function AddForm() {
    return (
        <div className='w-[95%] h-[95%] my-2 mx-3 flex flex-col gap-8   rounded-md '>

            <div className='flex justify-around items-center  w-full h-10 pt-3'>

                
                <div>
                    <p className='text-3xl font-medium'>Add New Group</p>
                </div>
               



            </div>

            <div className="p-8 w-[90%] mx-auto bg-gray-50">
                <form >

                    <div className="mb-6">
                        <label className="block text-black font-semibold mb-2">Name</label>
                        <input type='text'  className="bg-indigo-100 text-gray-800 p-3 rounded-md h-10 w-[100%]" />
                    </div>

                    <div className="mb-6">
                        <label className="block text-black font-semibold mb-2">Expiration Time</label>
                        <input  type='datetime-local' placeholder='24 Nov 2024' className="bg-indigo-100 text-gray-800 p-3 rounded-md h-10 w-[100%]" />

                    </div>

                    <div className="mb-6">
                        <label className="block text-black font-semibold mb-2">Type</label>

                        <select className="bg-indigo-100 text-gray-800 p-3 rounded-md h-11 w-[100%]">
                            <option value="private">private</option>
                            <option value="public">public</option>
                            <option value="Conversation">Conversation</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-black font-semibold mb-2">Description</label>
                        <textarea className="bg-indigo-100 text-gray-700 p-3 rounded-md max-h-44 w-[100%]">
                            
                        </textarea>
                    </div>

                    <div className="mb-6">
                        <label className="block text-black font-semibold mb-2">Banne World</label>
                        <textarea className="bg-indigo-100 text-gray-700 p-3 rounded-md max-h-44 w-[100%]">
                          
                        </textarea>
                    </div>
                    <div className='w-full flex justify-end'>
                        <button className='w-28 h-10 bg-green-600 rounded-md text-white font-medium'>
                            Submit
                        </button>
                    </div>



                </form>
            </div>


        </div >
    )
}
