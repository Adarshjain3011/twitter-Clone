import React, { useEffect, useState } from 'react'

import SideFeatureContainer from '../components/common/SideFeatureContainer' ;

import SearchBarContainer from '@/constant/SearchBarContainer';

import DisplayAllUserPosts from './post/DisplayAllUserPosts';
import DisplayAllPost from './post/DisplayAllPost';

const HomePage = () => {


    return (

        <div className='bg-black w-full min-h-screen flex justify-between gap-8 '>

            <SideFeatureContainer></SideFeatureContainer>
            
            {/* <DisplayAllUserPosts></DisplayAllUserPosts> */}

            <DisplayAllPost></DisplayAllPost>

            <SearchBarContainer></SearchBarContainer>

        </div>
    )
}

export default HomePage ;


