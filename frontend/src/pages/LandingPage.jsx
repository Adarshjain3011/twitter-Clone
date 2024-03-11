import React from 'react'

import { FaApple } from "react-icons/fa";

import ximage from "../assets/ximage.png";
import { Link } from 'react-router-dom';

import { useSelector,useDispatch } from 'react-redux';

import { AuthToken } from '../redux/slices/Auth';

import { useEffect,useState } from 'react';

import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const authData = useSelector((state) => state.auth.data);
    const isLoading = useSelector((state) => state.auth.loading);
    const isError = useSelector((state) =>state.auth.isError);

    console.log("first",authData,isLoading,isError);


useEffect(() => {

//   dispatch(AuthToken());


if (!isLoading) {

    console.log("authData:", authData);


    console.log("auth ka data lamdin gpage ke andar ",authData);
  
    if(authData === 400 || isError === 400){
        
        console.log("landing page call done ",authData);

        navigate("/auth/auth-signup");

    }
  
    else{
  
      navigate("/homepage");
      
    }
    // Use authData here after it's been fetched
  }

}, []);


// if (!isLoading) {

//     console.log("authData:", authData);


//     console.log("auth ka data lamdin gpage ke andar ",authData);
  
//     if(authData === 400 || isError === 400){
  
//         navigate("auth/auth-signup");

//     }
  
//     else{
  
//     //   navigate("/homepage");
      
//     }
//     // Use authData here after it's been fetched
//   }

    return (


        <div className=' w-full min-h-screen bg-black flex justify-center items-center'>


            <div className='flex w-[75%] bg-black justify-center items-center gap-80'>

                {/*we have two divs   */}


                <div className='w-[300px] h-[250px]'>

                    <img src={ximage} alt="" className='h-full w-full bg-cover ' />


                </div>

                <div className='flex flex-col w-[600px] bg-black gap-14'>

                    <h1 className='font-bold text-7xl w-full'>Happening now</h1>
                    <p className='font-bold text-3xl '>Join today.</p>


                    <div className='flex flex-col'>


                        <div className='flex w-[300px] bg-white border rounded-full p-2 text-black justify-center items-center '>

                            <FaApple className='h-[30px] w-[30px]'></FaApple>

                            <span className='font-bold'>Sign Up with Google</span>

                        </div>

                        <div className='flex gap-3  items-center'>

                            <div className='bg-slate-800 w-[150px] h-[1px]'>
                            </div>
                            <p className='text-left'>or</p>

                            <div className='bg-slate-800 w-[150px] h-[1px]'></div>

                        </div>

                        <div className='flex flex-col w-[300px] flex-wrap'>

                            <button className='font-bold bg-blue-400 w-[300px] p-2 border rounded-full'>Create account</button>
                            <p className='text-xs tracking-tighter '>By signing up, you agree to the <span className='text-blue-500 '>Terms of Service</span> and <span className='text-blue-500 '>Privacy Policy</span>, including <span className='text-blue-500 '>Cookie Use.</span></p>


                        </div>

                    </div>

                    <div className='flex flex-col gap-5'>

                        <p className='font-bold text-xl '>Already have an account?</p>

                        <Link to={"/auth/auth-signup"}>

                            <button className='font-bold  w-[300px] p-2 border-2 border-blue-600 rounded-full'>Sign in</button>

                        </Link>


                    </div>


                </div>

            </div>

        </div>

    )
}

export default LandingPage

