import React, { useEffect, useState } from 'react'

import SideFeatureContainer from '../constant/SideFeatureContainer';

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


    // async function callAuthToken() {

    //     try {

    //         let response = await dispatch(AuthToken());



    //     }
    //     catch (error) {

    //         console.log(error);

    //     }

    // }



    // if (!isLoading) {

    //     console.log("authData:", authData);

    //     if (authData === 400 || isError === 400) {

    //         console.log("Auth data value is ", authData);

    //         navigate("/auth/auth-signup");

    //     }

    //     else {

    //         console.log("home page jane ke liye taiyaar ", authData);

    //         navigate("/homepage");

    //     }

    // }



    // useEffect(() => {

    //     callAuthToken();

    // }, [])

    

    return (

        <div className='bg-black w-full min-h-screen flex justify-center '>

            <div className='flex w-[554px] gap-7 border'>


                {

                    click && <div className='w-[550px] flex flex-col bg-black fixed top-12 z-30 rounded-xl right-[25%]'>

                        <div className='flex'>

                            <div className='flex '>


                                <div className='flex rounded-full relative pl-3 pt-3'>

                                    <div className='w-[50px] h-[50px] rounded-full bg-white/75 flex justify-center items-center'>

                                        <img src={userDetails.userImage} alt="" className='w-full h-full bg-cover rounded-full' />

                                    </div>

                                </div>

                                <div className='w-[90%] relative flex flex-col pt-4 gap-2'>

                                    <p className='text-blue-7000'>@{userDetails.userName}</p>

                                    <p>{userDetails.postDescription}</p>
                                    <p className='text-blue-700'><span className='text-xl text-slate-400'>
                                        Replying to</span>@{userDetails.userName}</p>

                                </div>


                            </div>



                        </div>


                        <div className='border-none'>

                            {/* <CreatePost></CreatePost> */}

                            <ActualCreatePost></ActualCreatePost>


                        </div>

                    </div>
                }


                {/* </div> */}

                <div className='bg-black flex flex-col w-[550px] h-full'>


                    <CreatePost></CreatePost>

                    <DisplayAllPost userDetails={userDetails} setUserDetails={setUserDetails} setClick={setClick} click={click} />


                </div>

            </div>

        </div>
    )
}

export default HomePage



