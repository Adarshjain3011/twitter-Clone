import React from 'react';

import {useForm} from "react-hook-form";

import { CiSearch } from 'react-icons/ci';


const SearchBarContainer = () => {
    
    
    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = async (data) => {

        console.log(data);
    }

    return (

        <div>

            {/* Serach bar  */}

            <form className='flex flex-col gap-10 fixed mt-3' onSubmit={handleSubmit(onSubmit)}>

                <div className='flex justify-center items-center '>

                    <CiSearch className='text-xl absolute left-3'></CiSearch>

                    <input type='text' placeholder='Search' name='name'

                        {...register("name", { required: "name is required" })} className='w-[400px] p-2 pl-10 
                `rounded-md outline-none border rounded-full bg-[#202327] font-semibold
                text-2xl focus-within:border-blue-600'>

                    </input>

                </div>

            </form>


            {/* box Subs */}

            <div className='realtive flex flex-col mt-16 shadow-2xl bg-[#16181c] w-[400px] p-5 gap-3 rounded-lg'>

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

        </div>
    )
}

export default SearchBarContainer



