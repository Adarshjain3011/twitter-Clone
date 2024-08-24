import React, { useEffect, useState } from 'react'

import SideFeatureContainer from '../components/common/SideFeatureContainer' ;

import SearchBarContainer from '@/constant/SearchBarContainer';


const HomePage = () => {


    return (

        <div className='bg-black w-full min-h-screen flex justify-center '>

            <SideFeatureContainer></SideFeatureContainer>


            <SearchBarContainer></SearchBarContainer>

        </div>
    )
}

export default HomePage ;


