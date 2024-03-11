import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';

import { GiCrossMark } from "react-icons/gi";

import { useForm } from "react-hook-form";


import axios from "axios";

import { Link } from 'react-router-dom';

import abc from "../../assets/ximage.png";

import {useLocation} from "react-router-dom";

import AuthServices from '../../services/AuthService';



const ForgotChangePassword = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [formData, setFormData] = useState({});


    const location = useLocation();

    const emailData = location.state;

    console.log(emailData);

    console.log("hellow");

    const onSubmit = async (data) => {

        // console.log(errors);
        console.log("final data is inside onSubmit",data);

        const wholeData = {

            currentPassword:data.currentPassword,
            confirmPassword:data.confirmPassword,
            email:emailData,

        }

        console.log("whole Data is ",wholeData);

        await AuthServices.authForgotPassword(wholeData).then((val)=>{

            console.log(val);

            console.log(":passowrd change successfully ");

            navigate("/auth/auth-login");

            
        }).catch((error)=>{

            console.log("forgot chnage passowrd mai error ke andar ");

            console.log(error);


        })


    }


    return (


        <div className='w-full h-full bg-black min-h-screen flex justify-center items-center bg-cover'>



            <div className=' w-[600px] flex flex-col justify-center items-center h-[600px] m-auto gap-5'>

                <div className='flex justify-center full '>

                    {/* <GiCrossMark></GiCrossMark> */}

                    <div className='w-[40px] h-[40px] rounded-full '>

                        <img src={abc} alt="" className='w-full h-full bg-cover rounded-full ' />

                    </div>

                </div>


                <form className='flex flex-col gap-10 ' onSubmit={handleSubmit(onSubmit)}>

                    <h1 className='text-3xl font-bold text-center'>Change Your Password</h1>

                    <div>

                        {/* write new Password  */}

                        <input type='password' placeholder='Enter your new  Password' name='currentPassword'

                            {...register("currentPassword",

                                {
                                    required: "Password is required.",
                                    minLength: {
                                        value: 6,
                                        message: "Password should be at-least 6 characters."
                                    }

                                })}
                            className='w-[500px] p-4 rounded-md outline-none border
           bg-black font-semibold text-2xl
            focus-within:border-blue-600'>

                        </input>


                        {errors.newpassword && (
                            <p className="errorMsg text-red-500 font-semibold">{errors.password.message}</p>
                        )}

                    </div>


                    <div>

                        <input type='password' placeholder='Enter your Confirm  Password' name='confirmPassword'

                            {...register("confirmPassword",

                                {
                                    required: "Password is required.",
                                    minLength: {
                                        value: 6,
                                        message: "Password should be at-least 6 characters."
                                    }

                                })}

                            className='w-[500px] p-4 rounded-md outline-none border
           bg-black font-semibold text-2xl
            focus-within:border-blue-600'>

                        </input>


                        {errors.confirmPassword && (
                            <p className="errorMsg text-red-500 font-semibold">{errors.password.message}</p>
                        )}

                    </div>



                    <div className='flex justify-center items-center'>
                        
                        
                        
                        <button type='Submit' className='w-[300px] border-2 
           border-slate-500 p-3
            font-bold hover:bg-sky-500'
                        >ChangePassowrd
                        </button>

                    </div>


                </form>

            </div>

        </div>



    )
}

export default ForgotChangePassword;