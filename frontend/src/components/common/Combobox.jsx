import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { AiOutlineSearch } from 'react-icons/ai';

import PostServices from '../../services/PostService';

const ComboBox = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([{

        id: 1,
        name: "Sander Berge",
        type: "Trending",
        profileImage: "https://example.com/profile_image_1.jpg",
        verified: true,

    }]); // State to hold search results
    const [loading, setLoading] = useState(false);

    const handleInputChange = async (e) => {
        const query = e.target.value;

        setSearchTerm(e.target.value);
        setIsOpen(true); 
        try {
            console.log(query);
            let response = await PostServices.findUser(query);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error during API call:", error);
            return [];
        }
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger className='rounded-full'>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search the user by name"
                        name="name"
                        className="p-2 pl-10 outline-none rounded-full border bg-[#202327] font-semibold text-2xl"
                        onChange={handleInputChange}
                        onFocus={() => setIsOpen(true)}
                    />
                    <AiOutlineSearch className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-500" size={25} />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                <ul className="max-h-60 overflow-y-auto">
                    {searchResults ? (

                        searchResults.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center p-2 hover:bg-gray-100 transition-colors duration-150 ease-in-out cursor-pointer"
                            >
                                {item.avatar && (
                                    <img
                                        src={item.avatar}
                                        alt={item.name}
                                        className="w-8 h-8 rounded-full mr-3"
                                    />
                                )}
                                <div className="flex-grow">
                                    <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                                    {item.type && (
                                        <div className="text-xs text-gray-500">{item.type}</div>
                                    )}
                                </div>
                            </li>
                        ))

                    ) : (

                        <div className='text-white'>search data to find </div>
                    )
                    }

                </ul>
            </PopoverContent>
        </Popover>
    );
};

export default ComboBox;

async function changeHandler(query) {
    try {
        console.log(query);
        let response = await PostServices.findUser(query);
        return response.data.data;
    } catch (error) {
        console.error("Error during API call:", error);
        return [];
    }
}

