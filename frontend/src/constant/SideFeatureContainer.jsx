import React, { useEffect, useState } from 'react'

import ximage from "../assets/ximage.png";

import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { RiFileListLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { TbSquareForbid } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { TbDotsCircleHorizontal } from "react-icons/tb";


import userImage from "../assets/defaultUser.png";

import { useSelector,useDispatch } from 'react-redux';

import { AuthToken } from '../redux/slices/Auth';
import AuthServices from '../services/AuthService';


// import {CgMoreO} from "react-icons";

const SideFeatureContainer = () => {
    
    const dispatch = useDispatch();

    const authData = useSelector((state) => state.auth.data);
    const isLoading = useSelector((state) => state.auth.loading);
    const isError = useSelector((state) =>state.auth.isError);

    console.log("second ");

    const navigate = useNavigate();

    // const authData = useSelector((state) => state.auth.data);

    console.log("auth ka data landing page ke andar ",authData);

    const [openLogoutDiv,setOpenLogoutDiv] = useState(false);

    function moveToProfileContainer() {

        console.log("name of user ",(authData?.data)?.data?.name);

        navigate(`/profile/${(authData?.data)?.data?.name}`);

    }

    function moveToHome() {

        navigate("/profile");

    }

    async function userLogout(){


        try{

            const response = await AuthServices.userLogout();

            console.log("response ka data ",(response.data).data);

            navigate("/auth/auth-signup");


        }
        catch(error){


            console.log(error);

        }


    }

    async function tokenCall(){

        await dispatch(AuthToken());

        if (!isLoading) {

            console.log("authData:", authData);
          
            if(authData === 400 || isError === 400){

                console.log("Auth data value is ",authData);
          
                navigate("/");
        
            }
          
            else{

                console.log("home page jane ke liye taiyaar ",authData);
          
                navigate("/homepage");
              
            }
       
        }

    }



    useEffect(()=>{

        console.log("haa call gayi ");

        //  dispatch(AuthToken());

        if (!isLoading) {

            console.log("authData:", authData);
          
            if(authData === 400 || isError === 400){

                console.log("Auth data value is ",authData);
          
                navigate("/");
        
            }
          
            else{

                console.log("home page jane ke liye taiyaar ",authData);
          
                navigate("/homepage");
              
            }
       
        }
         tokenCall();
        
    },[])



    const SideFeatures = [

        { title: "Home", icon: <MdHomeFilled /> },
        { title: "Explore", icon: <FiSearch /> },
        { title: "Notifications", icon: <IoNotifications /> },
        { title: "Messages", icon: <IoMailOutline /> },
        { title: "Grok", icon: <TbSquareForbid /> },
        { title: "List", icon: <MdHomeFilled /> },
        { title: "Communities", icon: <FiUsers /> },
        { title: "Profile", icon: <FaRegUser />, onClick: moveToProfileContainer }, // Pass function directly
        { title:  "More",icon:<TbDotsCircleHorizontal></TbDotsCircleHorizontal>}
        
    ];



    return (

        <div className='w-full relative min-h-screen'>

            <div className='flex flex-col w-full mt-3 sticky top-5 gap-[1.5rem]'>


                <div className='flex flex-col gap-2'>

                    <div className='w-[25px] h-[25px] font-bold ml-2'>

                        <img src={ximage} alt="" className='w-full h-full bg-cover' />

                    </div>

                    <div className='flex flex-col gap-0'>


                        {

                            SideFeatures.map((data) => (


                                <div className='flex gap-6 hover:bg-slate-600 p-3 rounded-full ' onClick={data.onClick}>



                                    <span className='text-3xl'>

                                        {data.icon}

                                    </span>

                                    <h1 className='font-semibold text-xl'>{data.title}</h1>


                                </div>

                            ))
                        }

                    </div>

                    <button type='Submit' className='w-[250px] border-2 
                     bg-sky-500 p-3 rounded-full
                        font-bold'
                        onClick={moveToProfileContainer}>Post

                    </button>

                </div>
                

                <div className='flex items-center p-3 rounded-full justify-between h-full
                    transition transform hover:-translnoneate-y-1
                hover:bg-white/10 duration-500
                   motion-reduce:transition-none motion-reduce:hover:transform-'
                    onClick={()=>setOpenLogoutDiv(!openLogoutDiv)}>

                    <div className='flex justify-center items-center gap-4'>

                        <div className='w-[40px] h-[40px]'>

                            <img src={userImage} alt="" className='w-full h-full bg-cover rounded-full'/>
                            
                        </div>

                        <div>

                            <h1 className='text-center font-semibold text-xl'>{(authData?.data)?.data?.name}</h1>

                        </div>
                        
                    </div>

                    { 

                        openLogoutDiv && <div className='flex flex-col absolute left-[-1rem] top-[-6.6rem]
                                             bg-black w-[300px] h-[110px] shadow-2xl rounded-xl p-2 border border-white/25'
                                              >

                                            <p className='font-bold text-lg hover:bg-white/20 p-2'>Add an existing account </p>
                                            <p className='font-bold text-lg
                                             hover:bg-white/20 p-2'
                                             onClick={userLogout}>Log out @{(authData?.data)?.data?.name}</p>

                                        </div>


                    }


                    <div>

                        {/* three dots  */}

                        <HiOutlineDotsHorizontal className='font-bold text-2xl'></HiOutlineDotsHorizontal>

                    </div>

                </div>


            </div>

        </div>


    )
}

export default SideFeatureContainer

