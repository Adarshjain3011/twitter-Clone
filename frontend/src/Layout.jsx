import React from 'react';
import SearchBarContainer from './constant/SearchBarContainer';
import SideFeatureContainer from './components/common/SideFeatureContainer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className='bg-black w-screen min-h-screen flex justify-between gap-8'>
            {/* Sidebar / Left Column */}
            <div className='w-[30%]'>
                <SideFeatureContainer />
            </div>

            {/* Main Content / Middle Column */}
            <div className='flex-1'>
                <Outlet />
            </div>

            {/* Right Column */}
            <SearchBarContainer />

        </div>
    );
};

export default Layout;
