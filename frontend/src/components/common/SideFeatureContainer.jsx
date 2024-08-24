import React, { useState } from 'react';

import ximage from "../../assets/ximage.png";
import userImage from "../../assets/defaultUser.png";

import { useSideFeatures } from '../../constant/data';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Button from './Button';
import AuthServices from '../../services/AuthService';

const SideFeatureContainer = () => {
    
    const SideFeatures = useSideFeatures();
    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth.data);
    const navigate = useNavigate();

    const moveToProfileContainer = () => {
        navigate(`/profile/${(authData?.data)?.data?.name}`);
    };

    const userLogout = async () => {
        try {
            const response = await AuthServices.userLogout();
            navigate("/auth/auth-signup");
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className=' min-h-screen'>
            <div className='flex relative h-[95%] flex-col gap-8 justify-between mt-3'>
                
                <div className='flex relative flex-col'>
                    <div className=' flex flex-col gap-2'>
                        <div className='w-[25px] h-[25px] font-bold ml-2'>
                            <img src={ximage} alt="" className='w-full h-full bg-cover' />
                        </div>

                        <div className='flex flex-col gap-4'>
                            {SideFeatures && SideFeatures.map((data, index) => (
                                <div key={index} className='flex gap-4 p-1 items-center hover:bg-slate-600 rounded-full' onClick={data.onClick}>
                                    <span className='text-3xl'>{data.icon}</span>
                                    <h1 className='font-medium text-xl text-center'>{data.title}</h1>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type='Submit' className='border-2 bg-sky-500 rounded-full py-3 w-60 mt-3 font-bold' onClick={moveToProfileContainer}>
                        Post
                    </button>

                </div>


                <Popover>
                    <PopoverTrigger asChild>
                        <div className='flex justify-between cursor-pointer'>
                            <div className='flex justify-center items-center gap-2'>
                                <div className='w-[30px] h-[30px]'>
                                    <img src={userImage} alt="" className='w-full h-full bg-cover rounded-full' />
                                </div>
                                <div>
                                    <h1 className='text-center font-semibold text-sm text-nowrap'>{(authData?.data)?.data?.name}</h1>
                                </div>
                            </div>
                            <HiOutlineDotsHorizontal className="text-2xl" />
                        </div>
                    </PopoverTrigger>

                    <PopoverContent
                        className='bg-black w-[300px] h-[110px] shadow-2xl rounded-xl p-2 border border-white/25'
                        side="top" // Positions the PopoverContent above the trigger
                        align="center" // Centers the PopoverContent horizontally with respect to the trigger
                    >
                        <p className='font-bold text-lg hover:bg-white/20 p-2 cursor-pointer'>
                            Add an existing account
                        </p>
                        <p
                            className='font-bold text-lg hover:bg-white/20 p-2 cursor-pointer'
                            onClick={userLogout}
                        >
                            Log out @{(authData?.data)?.data?.name}
                        </p>
                    </PopoverContent>
                </Popover>

            </div>
        </div>
    );
};

export default SideFeatureContainer;


