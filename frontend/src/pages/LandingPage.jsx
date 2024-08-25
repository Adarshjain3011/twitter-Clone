import React from 'react';
import { FaApple } from "react-icons/fa";
import ximage from "../assets/ximage.png";
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full min-h-screen bg-black flex justify-center items-center'>
            <div className='flex flex-col lg:flex-row  w-[75%] bg-black justify-center items-center gap-8 md:gap-80'>
                <div className='w-[70px] h-[70px] md:w-[300px] md:h-[250px]'>
                    <img src={ximage} alt="" className='h-full w-full bg-cover' />
                </div>

                <div className='flex flex-col w-[250px] md:w-[600px] bg-black gap-14'>
                    <h1 className='text-5xl md:text-7xl w-full font-extrabold'>Happening now</h1>
                    <p className='font-extrabold text-xl md:text-3xl'>Join today.</p>

                    <div className='flex flex-col'>

                        <Button color="white" Icon={FaApple} link="/" bgColor="text" textColor="text">Sign up with Apple</Button>

                        <div className='flex gap-3 items-center'>
                            <div className='bg-slate-800 w-[150px] h-[1px]'></div>
                            <p className='text-left'>or</p>
                            <div className='bg-slate-800 w-[150px]  h-[1px]'></div>
                        </div>

                        <Button color="bg-blue-400" link="/auth/auth-signup" bgColor="blue-600" textColor="white">Create account</Button>

                        <p className='text-xs tracking-tighter'>By signing up, you agree to the <span className='text-blue-500'>Terms of Service</span> and <span className='text-blue-500'>Privacy Policy</span>, including <span className='text-blue-500'>Cookie Use.</span></p>

                    </div>

                    <div className='flex flex-col gap-5'>

                        <p className='font-bold text-xl text-white'>Already have an account?</p>

                        <Button bgColor="black" textColor="text-blue-500" link="/auth/auth-login">Sign in</Button>

                    </div>
                </div>
            </div>
        </div>
    );
}


function Button({ children, bgColor,textColor, Icon, link }) {
    const navigate = useNavigate();

    return (
        <div
            className={`flex w-[300px] bg-${bgColor} border rounded-full p-2 text-${textColor} justify-center items-center cursor-pointer`}
            onClick={() => navigate(link)}
        >
            {Icon && <Icon className='h-[30px] w-[30px] mr-2' />}
            <span className='font-bold'>{children}</span>
        </div>
    );
}

export default LandingPage;
