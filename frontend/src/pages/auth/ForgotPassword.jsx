import React from 'react'

import { useForm } from "react-hook-form";

import { IoMailOutline } from "react-icons/io5";

import AuthServices from '../../services/AuthService';

import { useNavigate } from 'react-router-dom';

import OtpInput from 'react-otp-input';

import {useState} from "react";

import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const [otp, setOtp] = useState('');

    console.log(otp);

    const onSubmit = async(data)=>{

        const userData = {

            email:data.email
            
          }

        console.log("userdata.email",userData.email);

            await AuthServices.authResendOtp(userData.email).then((data)=>{

                console.log(data);

                toast.success("otp has been send to your gmail");
        
                navigate("/auth/auth-OtpChangePassowrd",{ state:userData });

            }).catch((error)=>{

                console.log("error occur while send the form");

                console.log(error);

            })

    }

    return (

        <div className='w-full min-h-screen flex justify-center items-center bg-[#161D29] bg-cover '>

            {/*  */}

            <div className='w-[600px] m-auto flex justify-center items-center bg-[#000814] h-[400px] flex-col border  gap-8 shadow-2xl rounded-lg p-4'>


                <div className='flex flex-col relative gap-6'>
                    {/* icon */}

                    <h1 className='text-4xl text-white font-semibold text-center'>Forgot Pssword</h1>
                    <p className='text-xl'>Enter Email For Verification Code </p>

                </div>

                <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>

                    <p className='text-2xl'>Email Address</p>

                    <div className='flex relative'>

                        <IoMailOutline className='absolute top-5 h-[30px] w-[30px] left-3'></IoMailOutline>

                        <div>

                            <input type='email' placeholder='Enter your Email' name='email'

                                {...register("email",
                                    {
                                        required: "email is required",
                                        pattern: {

                                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                            message: "Email is not valid."

                                        }

                                    })}
                                className='w-[450px] p-4 rounded-md outline-none border pl-14
bg-black font-semibold text-2xl
 focus-within:border-blue-600'>

                            </input>

                            {errors.email && <p className="errorMsg text-red-500 font-semibold">{errors.email.message}</p>}

                        </div>

                    </div>

                    <div className='flex justify-center items-center mt-5'>

                        <button className='text-xl font-bold p-4 border-2 border-sky-400 w-[200px]' type='Submit'>Send Otp</button>

                    </div>


                </form>

                <div className='flex gap-2'>

                    <h1 className='font-bold'>Don't have an account yet?</h1>
                    <h1 className='text-indigo-600'>Register</h1>

                </div>


            </div>

            {/* <OtpInput 

      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    /> */}
        </div>

    )
}

export default ForgotPassword