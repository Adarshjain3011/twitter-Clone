import React, { useEffect, useState } from 'react'

import SideFeatureContainer from '../components/common/SideFeatureContainer';

import SearchBarContainer from '@/constant/SearchBarContainer';

import DisplayAllUserPosts from './post/DisplayAllUserPosts';
import DisplayAllPost from './post/DisplayAllPost';

const HomePage = () => {


    return (

        <div className='bg-black w-screen min-h-screen flex justify-between gap-8 '>

            <div className='w-[30%]'>

                <SideFeatureContainer></SideFeatureContainer>

            </div>


            {/* <DisplayAllUserPosts></DisplayAllUserPosts> */}

            <div className=''>

                <DisplayAllPost></DisplayAllPost>

            </div>


            <SearchBarContainer></SearchBarContainer>

        </div>
    )
}

export default HomePage;


