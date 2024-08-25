import React, { useEffect, useState } from 'react'

import SideFeatureContainer from '../components/common/SideFeatureContainer';

import SearchBarContainer from '@/constant/SearchBarContainer';

import CommonDisplayPost from "./post/ComonDisplayPost";

import PostServices from '../services/PostService';

import { useDispatch } from 'react-redux';

const HomePage = () => {

    const dispatch = useDispatch();

    return (

        <div className='bg-black w-screen min-h-screen flex justify-between gap-8 '>

            <div className='w-[30%]'>

                <SideFeatureContainer></SideFeatureContainer>

            </div>

            <div className='w-[50%]'>

                <CommonDisplayPost fetchDataPost={PostServices.getAllPosts}></CommonDisplayPost>

            </div>


            <SearchBarContainer></SearchBarContainer>

        </div>
    )
}

export default HomePage;


