import React, { useEffect, useState } from 'react'

import SideFeatureContainer from '../components/common/SideFeatureContainer';

// import DisplayAllPost from "../pages/post/DisplayAllPost";

import DisplayAllPost from '../pages/post/DisplayAllPost';

import Profile from "./Profile";

import SearchBarContainer from '../constant/SearchBarContainer';

import CreatePost from "../pages/post/CreatePost";

import { useSelector, useDispatch } from 'react-redux';

import { AuthToken } from '../redux/slices/Auth';

import { useNavigate } from 'react-router-dom';

import ActualCreatePost from './post/ActualCreatePost';


const HomePage = () => {

    const [click, setClick] = useState(false);

    const dispatch = useDispatch();

    const authData = useSelector((state) => state.auth.data);
    const isLoading = useSelector((state) => state.auth.loading);
    const isError = useSelector((state) => state.auth.isError);

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({ userImage: "", userName: "", postDescription: "" })

    

    return (

        <div className='bg-black w-full min-h-screen flex justify-center '>



        </div>
    )
}

export default HomePage



