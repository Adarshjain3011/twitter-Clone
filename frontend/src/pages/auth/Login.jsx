import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';

import { GiCrossMark } from "react-icons/gi";

import { useForm } from "react-hook-form";

import abc from "../../assets/ximage.png";

import { useDispatch, useSelector } from "react-redux"

import axios from "axios";

import { authData } from '../../redux/slices/Auth';

import { toast } from "react-toastify"



const Login = () => {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();


  const dispatch = useDispatch();


  console.log("hellow");

  const state = useSelector((state) => state);

  const onSubmit = async (data) => {

    // console.log(errors);

    console.log("data", data);

    // console.log(state);

    await dispatch(authData(data)).then((response) => {

      console.log(state);


      // if(state.auth.is)
      if (state.auth.isError === 410) {

        console.log(state.auth.isError);

        toast.warning("plz verify your email ");

        navigate("/auth/auth-signup",{replace:true});


      }

      else if (state.auth.isError === 400) {

        toast.error("passoword dosent match ");

      }
      else {


        navigate("/homepage");

      }


    })


  }

  // function moveToOtp(){


  //   navigate("auth/auth-forgotPassword");

  // }

  return (


    <div className='w-full h-full bg-black'>



      <div className=' w-[600px] flex flex-col justify-center items-center h-[600px] m-auto gap-5'>

        <div className='flex justify-center full '>

          {/* <GiCrossMark></GiCrossMark> */}

          <div className='w-[40px] h-[40px] rounded-full '>



            <img src={abc} alt="" className='w-full h-full bg-cover rounded-full ' />

          </div>

        </div>


        <form className='flex flex-col gap-10 ' onSubmit={handleSubmit(onSubmit)}>

          <h1 className='text-3xl font-bold text-center'>Login Your Account</h1>


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
              className='w-[500px] p-4 rounded-md outline-none border
            bg-black font-semibold text-2xl
             focus-within:border-blue-600'>

            </input>

            {errors.email && <p className="errorMsg text-red-500 font-semibold">{errors.email.message}</p>}

          </div>

          <div>

            <input type='password' placeholder='Enter your Password' name='password'

              {...register("password",

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

            <Link to ="/auth/auth-forgotPassword">

              <p className='text-end text-sky-600/90 font-bold hover:underline '>forgot password</p>

            </Link>



            {errors.password && (
              <p className="errorMsg text-red-500 font-semibold">{errors.password.message}</p>
            )}

          </div>

          <div className='flex justify-center items-center'>

            <button type='Submit' className='w-[300px] border-2
           border-slate-500 p-3
            font-bold hover:bg-sky-500'
            >Log in
            </button>

          </div>

          <div className='flex'>

            <p className='hover:underline '>if you haven't an account ?</p>

            <Link to="/auth/auth-signup">

              <p className='text-blue-600'>signup</p>

            </Link>

          </div>

        </form>

      </div>

    </div>



  )
}

export default Login;

