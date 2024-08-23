import React, { useState } from 'react';

import { useForm } from "react-hook-form";

import { CiSearch } from 'react-icons/ci';
import AuthServices from '../services/AuthService';
import PostServices from '../services/PostService';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { useNavigate } from 'react-router-dom';

import ComboBox from '../components/common/Combobox';


const SearchBarContainer = () => {


    const { register, handleSubmit, formState: { errors } } = useForm();

    const [click, setClick] = useState(false);

    const [searchResult, setSearchResult] = useState([]);

    const [Loading, setLoading] = useState(false);


    const navigate = useNavigate();


    const onSubmit = async (data) => {

        console.log(data);
    }



    async function changeHandler(event) {

        try {

            console.log(event.target.value);

            setLoading(true);


            let response = await PostServices.findUser(event.target.value);

            console.log(response.data.data);


            setSearchResult(response.data.data);


            setLoading(false);



        }
        catch (error) {

            console.log(error);

        }
    }


    

    function moveToUserProfile(name){

        navigate(`/profile/${name}`);


    }

    

    return (

        <div className='w-full'>

            {/* Serach bar  */}


            {/* <form className='flex flex-col gap-10 fixed mt-3 z-20' onSubmit={handleSubmit(onSubmit)}>

                <div className='flex justify-center items-center ' onClick={() => setClick(!click)}>

                    <CiSearch className='text-xl absolute left-3'></CiSearch>

                    <input type='text' placeholder='Search the user by name' name='name'

                        {...register("name", { required: "name is required" })} className='w-[400px] p-2 pl-10 
                            `rounded-md outline-none border rounded-full bg-[#202327] font-semibold
                            text-2xl focus-within:border-blue-600' onChange={changeHandler}>

                    </input>

                </div>

            </form> */}

            <ComboBox></ComboBox>

            <div className='relative'>

                <div className='realtive flex flex-col mt-20 shadow-2xl bg-[#16181c] w-[400px] p-5 gap-3 rounded-lg '>

                    <h1 className='font-extrabold text-2xl'>Subscribe to Premium</h1>

                    <p className='text-wrap font-semibold'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>

                    <button

                        className='w-[150px] border-2 
                    bg-sky-500 p-1
                    font-bold rounded-full'
                    >
                        Subscribe

                    </button>

                </div>

                <div className='absolute top-0 bg-black w-full border-2 border-gray-800 rounded-xl max-h-[400px]'>

                    {
                        click && (

                            searchResult.length > 0 ? (
                                // Render search results
                                <div className='flex flex-col gap-4 mt-4 h-auto'>
                                    {

                                        searchResult.map((data) => (

                                            <div className='flex gap-4 p-3 hover:bg-gray-800 rounded-xl' onClick={()=>moveToUserProfile(data.name)}>

                                                <div className='w-[40px] h-[40px] rounded-full'>

                                                    <img src={data.userImage} alt="" className='w-full h-full bg-cover rounded-full' />

                                                </div>

                                                <div className='flex flex-col gap-2'>

                                                    <h1>{data.name}</h1>

                                                    <p className='text-gray-500'>{data.email}</p>

                                                </div>


                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div>

                                    {/* Skeleton loading */}
                                    <Skeleton /> {/* Simple, single-line loading skeleton */}
                                    <Skeleton count={5} /> {/* Five-line loading skeleton */}

                                </div>
                            )
                        )
                    }

                </div>

            </div>


        </div>
    )
}

export default SearchBarContainer



