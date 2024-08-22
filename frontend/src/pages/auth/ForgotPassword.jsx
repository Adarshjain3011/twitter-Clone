import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { IoMailOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AuthServices from '../../services/AuthService';
import InputBox from '../../components/common/InputBox'; // Import the reusable InputBox component

import Button from '../../components/common/Button';

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const userData = { email: data.email };

        try {
            const response = await AuthServices.authResendOtp(userData.email);
            console.log(response);

            toast.success("OTP has been sent to your email");
            navigate("/auth/auth-OtpChangePassowrd", { state: userData });
        } catch (error) {
            console.log("Error occurred while sending the form", error);
        }
    };

    return (
        <div className='w-full min-h-screen flex justify-center items-center bg-[#161D29] bg-cover'>
            <div className='w-[600px] m-auto flex justify-center items-center bg-[#000814] h-[400px] flex-col border gap-8 shadow-2xl rounded-lg p-4'>
                <div className='flex flex-col relative gap-6'>
                    <h1 className=' text-4xl md:text-5xl text-white font-semibold text-center'>Forgot Password</h1>
                    <p className='text-base md:text-xl text-center'>Enter Email For Verification Code</p>
                </div>

                <form className='flex flex-col gap-9' onSubmit={handleSubmit(onSubmit)}>

                    <InputBox
                        type='email'
                        placeholder='Enter your Email'
                        name='email'
                        register={register}
                        errors={errors}
                        icon={<IoMailOutline className='absolute top-5 h-[30px] w-[30px] left-3' />}
                        inputClassName='pl-14'
                    />

                    <Button clickHandler={handleSubmit(onSubmit)}>Send Otp</Button>

                </form>

                <div className='flex gap-2 '>

                    <h1 className='font-bold hover:underline hover:cursor-pointer'>Don't have an account yet?</h1>

                    <Link to="auth/auth-signup">

                        <h1 className='text-indigo-600 hover:underline hover:cursor-pointer'>Register</h1>

                    </Link>
                    
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;


