import React, { useEffect, useState } from 'react'

import SideFeatureContainer from '../components/common/SideFeatureContainer';

import SearchBarContainer from '@/constant/SearchBarContainer';

import CommonPostDisplay from "./post/CommonDisplayPost";

import PostServices from '../services/PostService';

import { useDispatch } from 'react-redux';
import PostTopBar from './post/PostTopBar';


const HomePage = () => {

    const dispatch = useDispatch();

    return (

        <div className='bg-black w-screen min-h-screen flex justify-between gap-8 '>

            {/* first  */}

            <div className='w-[30%]'>

                <SideFeatureContainer></SideFeatureContainer>

            </div>

            {/* second  */}

            <div className=' relative w-[67.4%] flex flex-col'>

                <div className=''>

                    <PostTopBar></PostTopBar>

                </div>

                <div className='relative w-full'>

                    <CommonPostDisplay fetchDataPost={PostServices.getAllPosts}></CommonPostDisplay>

                </div>

            </div>

            

            <SearchBarContainer></SearchBarContainer>


        </div>
    )
}

export default HomePage;


