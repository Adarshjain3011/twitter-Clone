import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";

import { PiUserCircleFill } from "react-icons/pi";

import { FaCalendarAlt } from "react-icons/fa";


import User from "../assets/defaultUser.png";

import UserAdditionalDetails from "../constant/UserAdditionalDetails";

import DisplayAllPost from './post/DisplayAllUserPosts';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { useLocation, useSearchParams } from 'react-router-dom';
import AuthServices from '../services/AuthService';

import Likes from "../pages/profile/Likes";
import DisplayAllUserPosts from './post/DisplayAllUserPosts';
import PostServices from '../services/PostService';
import { toast } from 'react-toastify';

const Profile = () => {

    const authData = useSelector((state) => state.auth.data);

    const isLoading = useSelector((state) => state.auth.loading);

    const isError = useSelector((state) => state.auth.isError);


    const [sameUser, setSameUser] = useState(false);

    const [statusValue, setStatusValue] = useState('');

    const [originalUserData, setOriginalUserData] = useState([]);

    // const [newAuthData, setAuthData] = useState((authData?.data)?.data);
    
    const [newAuthData, setAuthData] = useState([]);


    console.log("original user data ", originalUserData);
    console.log("visitor user data ",newAuthData);


    const [userPostsLength, setUserPostsLength] = useState('');

    console.log("all user posts length ", userPostsLength);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const location = useLocation();

    let [searchParams, setSearchParams] = useSearchParams();

    const timestamp = new Date((authData?.data)?.data?.createdAt);


    console.log("user name from auth data ", (authData?.data)?.data.name);   // new user 

    console.log("new time stamp ", timestamp.toLocaleString('en-US', { month: 'long' }));

    const month = timestamp.toLocaleString('en-US', { month: 'long' });

    const year = timestamp.getFullYear();
    // console.log("month ",timestamp.getFullYear());

    console.log("location  is ", location.pathname.replace("%20", " "));

    // console.log("search params ",searchParams);

    const [userProfileData, setUserProfileData] = useState([]);

    console.log("user profile usestateData", userProfileData);

    const [clickedButton, setClickedButton] = useState('Posts');


    let originalUser = location.pathname.replace("%20", " ").split("/")[location.pathname.replace("%20", " ").split("/").length - 1];


    let newUser = (authData?.data)?.data.name;

    console.log("joh profile visit karne aaaya hai ", (authData?.data));


    console.log("auth ka data",newAuthData);

    // console.log("joh profile visit karne aayaa hai ushka data ",(authData?.data)?.data['following']);

    console.log("jishki profile hai  ", originalUserData);



    // get the user details 

    async function getUserDetails() {

        try {

            //original user 

            let userName = location.pathname.replace("%20", " ").split("/")[location.pathname.replace("%20", " ").split("/").length - 1];

            console.log("fetched user Name ", userName);

            const response = await AuthServices.getUserProfileDetails(userName);

            console.log("response ka data hai ", Object.values((response.data).data)[0]);

            setOriginalUserData(Object.values((response.data).data)[0]);

            setUserProfileData(Object.values((response.data).data)[0]);

            setUserPostsLength(Object.values((response.data).data)[1]);

            console.log("user profile data ", userProfileData);



        }
        catch (error) {

            navigate("/");

            console.log(error);


        }
    }

    


    async function getVisiTorUserDetails() {

        try {


            console.log("fetched user Name ", (authData?.data)?.data.name);

            const response = await AuthServices.getUserAllDetails();

            console.log("response ka data hai ",response.data.data);

            setAuthData(response.data.data);


            // console.log("user profile data ", userProfileData);



        }
        catch (error) {

            navigate("/");

            console.log(error);


        }
    }





    async function setUserProfileHandler() {

        try {

            navigate("/editProfile", { state: userProfileData })

        }

        catch (error) {

            console.log(error);

        }
    }

    


    function clickHandler(title) {

        setClickedButton(title);


    }




    async function followUnfollowHandler(newUser, originalUser) {

        try {

            let response = await PostServices.performFollowUnfollow(newUser, originalUser);
            const newData = Object.values((response?.data).data)[0];


            console.log("new data ",newData);

            // Clone the existing auth data to avoid mutating it directly
            const updatedAuthData = { ...newAuthData };

            if (newData['following'].includes(originalUserData[0]._id)) {
                // Add the original user's ID to the following list
                updatedAuthData['following'] = [...updatedAuthData['following'], originalUserData[0]._id];
                toast.success("User successfully followed.");

            } else {
                // Remove the original user's ID from the following list
                updatedAuthData['following'] = updatedAuthData['following'].filter(id => id !== originalUserData[0]._id);
                toast.warning("User unfollowed.");
            }

            // Update the state with the modified auth data

            setAuthData(updatedAuthData);

        } catch (error) {

            console.log(error);

        }
    }






    useEffect(() => {

        if (originalUser === undefined) {

            navigate("/auth-signup");

        }


        getUserDetails();

        getVisiTorUserDetails();


    }, [location.pathname]);




    return (

        <div className='w-full'>

            <div className='w-[550px] relative flex flex-col border border-zinc-700'>

                <div className='flex items-center gap-8 pl-2 sticky top-0 w-full bg-black z-10'>

                    <abbr title='image' className='text-start '>


                        <div className='w-[40px] h-[40px]
                         hover:bg-white/20 rounded-full 
                         flex justify-center items-center' onClick={() => navigate("/homepage")}>

                            <FaArrowLeft></FaArrowLeft>

                        </div>


                    </abbr>

                    <div className='flex flex-col'>

                        {/* username */}

                        <h1 className='text-2xl font-semibold'>{userProfileData[0]?.name}</h1>

                        {/* total number of posts  */}

                        <p className='text-white/45'>{userPostsLength} posts</p>

                    </div>


                </div>

                <div className='bg-zinc-800 h-[200px] group'>

                    <div className=' w-full start-0 h-full opacity-0 duration-300 bg-red-900 group-hover:opacity-35'></div>

                </div>


                <div className='flex justify-between p-3 relative'>

                    {/* left div  */}

                    <div className='flex flex-col gap-5'>

                        <div className='w-[140px] h-[140px] rounded-full p-2 bg-black absolute top-[-80px]'>

                            {/* {

                                console.log("useriamge ",userProfileData[0]?.userImage)
                            } */}

                            <img src={userProfileData[0]?.userImage} alt="" className='w-full h-full bg-cover rounded-full' />

                        </div>


                        <div className='mt-[4rem] flex flex-col gap-2'>

                            <h1 className='font-bold text-2xl'>{originalUser}</h1>
                            <div className='flex gap-2 items-center'>

                                <FaCalendarAlt className='text-white/30'></FaCalendarAlt>

                                <p className='text-white/30'>Joined {month} {year}</p>

                            </div>

                            <div className='flex gap-7'>

                                <p className='text-white/30'>Following</p>
                                <p className='text-white/30'>Follower</p>

                            </div>

                        </div>


                    </div>

                    <div>

                        {/* when curretn user viewed his profile */}

                        {

                            (originalUser === newUser) && <div className='' onClick={setUserProfileHandler}>

                                <button className='font-bold border-2 border-white/45 p-2
                                             rounded-full pl-3 pr-3'>Set up Profile</button>

                            </div>

                        }



                        {originalUser !== newUser && (

                            // Check if the newAuthData (visiting user) follows the originalUser (profile owner)
                            (newAuthData?.following?.includes(originalUserData[0]?._id)) ? (

                                // If the visiting user doesn't follow the profile owner, display the "Follow" button
                                <button className='font-bold border-2 border-white/45 p-2 rounded-full pl-3 pr-3' onClick={() => followUnfollowHandler(originalUser, newUser)}>
                                    Unfollow
                                </button>
                                
                            ) : (
                                // Check if the originalUser (profile owner) follows the newAuthData (visiting user)
                                (originalUserData[0]?.following?.includes(newAuthData?.data?.data?._id)) ? (
                                    // If both users follow each other, display the "Unfollow" button
                                    <button className='font-bold border-2 border-white/45 p-2 rounded-full pl-3 pr-3' onClick={() => followUnfollowHandler(originalUser, newUser)}>
                                        followBack
                                    </button>
                                ) : (
                                    // If the visiting user follows the profile owner but profile owner doesn't follow back, display the "Unfollow" button
                                    <button className='font-bold border-2 border-white/45 p-2 rounded-full pl-3 pr-3' onClick={() => followUnfollowHandler(originalUser, newUser)}>
                                        Follow
                                    </button>
                                )
                            )
                        )}




                    </div>

                    {/* right div  */}

                </div>

                <div className=' flex '>

                    {

                        UserAdditionalDetails.map((data) => (


                            // <div className='flex flex-col'>


                            <div className=' flex flex-col gap-3 justify-center
                                    items-center w-[140px] p-2 hover:bg-white/40' onClick={() => clickHandler(data.tittle)}>

                                <p className='border-none outline-none'>{data.tittle}</p>

                                {

                                    data.tittle === clickedButton && <div className='h-[5px] w-[60px] bg-blue-500 rounded-full'></div>
                                }

                            </div>

                        ))
                    }

                </div>

                {

                    clickedButton === "Posts" && <DisplayAllUserPosts></DisplayAllUserPosts>

                }

                {

                    clickedButton === "Likes" && <Likes></Likes>

                }

            </div>

        </div>
    )
}

export default Profile





