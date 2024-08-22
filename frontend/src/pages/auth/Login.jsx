import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';

import { GiCrossMark } from "react-icons/gi";

import { useForm } from "react-hook-form";

import abc from "../../assets/ximage.png";

import { useDispatch, useSelector } from "react-redux"

import axios from "axios";

import { authData } from '../../redux/slices/Auth';

import { toast } from "react-toastify" ;

import InputBox from '../../components/common/InputBox';

import Button from '../../components/common/Button';



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


    <div className='w-screen min-h-screen bg-black flex justify-center items-center'>

      <div className=' flex flex-col justify-center items-center  m-auto gap-5'>

        <div className='flex justify-center full '>

          {/* <GiCrossMark></GiCrossMark> */}

          <div className='w-[40px] h-[40px] rounded-full '>



            <img src={abc} alt="" className='w-full h-full bg-cover rounded-full ' />

          </div>

        </div>


        <form className='flex flex-col gap-10 ' onSubmit={handleSubmit(onSubmit)}>

          <h1 className='text-3xl font-bold text-center'>Login Your Account</h1>


          <InputBox
            type='email'
            placeholder='Enter your Email'
            name='email'
            register={register}
            errors={errors}
          />
          <InputBox
            type='password'
            placeholder='Enter your Password'
            name='password'
            register={register}
            errors={errors}
          />
          <Button clickHandler={handleSubmit(onSubmit)}>Sign Up</Button>

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

