import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { RxCrossCircled } from 'react-icons/rx';
import PostServices from '../../services/PostService';

const ComboBox = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [searchResultData, setSearchResultData] = useState(null);

    const handleInputChange = async (e) => {

        setSearchTerm(e.target.value);
        setIsOpen(true);

        if (e.target.value === '') {

            setSearchTerm('');
            setIsOpen(false);
            return;
        }


        try {
            let response = await PostServices.findUser(e.target.value);
            console.log("searched Query data ", response.data.data);
            setSearchResultData(response.data.data);
        } catch (error) {
            console.error("Error during API call:", error);
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setIsOpen(false);
        setSearchResultData(null);
    };

    return (

        <div className="relative w-full ">


            <div className='w-[400px] z-50 fixed'>

                <input
                    type="text"
                    placeholder="Search the user by name"
                    name="name"
                    className={` relative w-full py-2 pl-12 outline-none rounded-full border ${!isOpen ? "bg-[#202327]" : "bg-black border-blue-500"} font-semibold text-xl`}
                    onChange={handleInputChange}
                    value={searchTerm}
                    onClick={() => setIsOpen(true)}
                />
                <AiOutlineSearch className="text-gray-500 absolute left-2 top-3" size={30} />
                {isOpen && searchTerm?.length > 0 && (
                    <RxCrossCircled
                        onClick={clearSearch}
                        className="text-blue-500 absolute top-2 right-[2%] cursor-pointer"
                        size={30}
                    />
                )}

            </div>


            <div className='absolute top-16 z-50 w-full'>
                {isOpen && (
                    <div className=' max-h-[300px] overflow-y-auto min-h-24 border-[2px] flex  border-white/[0.2] shadow-white/[0.2] rounded-xl bg-black shadow-2xl'>
                        {searchResultData && searchResultData.length > 0 ? (
                            <div className="flex flex-col w-full justify-center items-center relative p-2">
                                {searchResultData.map((data, index) => (

                                    <div className='flex gap-7 relative w-full items-center p-2 rounded-xl hover:bg-blue-700'>

                                        <div className='w-[40px] h-[40px] rounded-full'>

                                            <img src={data?.userImage} alt="" className='w-full h-full bg-cover rounded-full' />

                                        </div>

                                        <p key={index} className="text-white text-center">
                                            {data?.name}
                                        </p>

                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='flex relative w-full justify-center items-center'>

                                <p className='text-center'>Try searching for people, lists, or keywords  </p>

                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComboBox;
