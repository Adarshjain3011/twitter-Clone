import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';

import { GiCrossMark } from "react-icons/gi";

import { useForm } from "react-hook-form";


import axios from "axios";

import { Link } from 'react-router-dom';

import abc from "../../assets/ximage.png";

import { useDispatch, useSelector } from 'react-redux';

import { authData } from "../../redux/slices/Auth.js";

import AuthServices from '../../services/AuthService.jsx';

// import { jsonData } from '../../services/HttpCommon';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useLocation,useSearchParams } from 'react-router-dom';

// import { useHistory } from "react-router-dom";


const SignUp = () => {



  const location = useLocation();

  console.log("signup ke andar pathname",location.pathname);

  let [searchParams, setSearchParams] = useSearchParams();

  const state = useSelector((state) => state);

  // console.log(state?.auth?.data);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [formData, setFormData] = useState({});

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const dispatch = useDispatch();

  console.log(BASE_URL);


  // const histroy = useHistory();

  console.log("hellow");

  const onSubmit = async (data) => {

    // console.log(errors);
    console.log(data);

    toast.success("hellow ");

    // setFormData(data);

    
    const userData = {

      email:data.email
      
    }

    await AuthServices.authSignup(data).then((data)=>{

        console.log("signup data is ",data.data);

        navigate("/auth/auth-otpVerificationForm", { state: userData, replace: true });

        // navigate("auth/auth-signup");
        // navigate("/auth/auth-otpVerificationForm");

    }).catch(async(error)=>{

      console.log("error ka data ",error);

      // // console.log(error.response.status);

      if(error?.response?.status === 301){

        console.log("datae mail",data.email);

        //By setting replace: true, the previous URL entry will be replaced with the new one, and the previous URL won't be included in the navigation state.

        navigate("/auth/auth-otpVerificationForm",{ state:userData,replace: true });



          
      }

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

          <h1 className='text-3xl font-bold text-center'>Create your account</h1>

          <div>


            <input type='text' placeholder='Enter your Name' name='name'

              {...register("name", { required: "name is required" })} className='w-[500px] p-4
            rounded-md outline-none border bg-black font-semibold
             text-2xl focus-within:border-blue-600'>

            </input>

            {errors.name && <p className="errorMsg text-red-500 font-semibold">{errors.name.message}</p>}

          </div>


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


            {errors.password && (
              <p className="errorMsg text-red-500 font-semibold">{errors.password.message}</p>
            )}

          </div>

          <div className='flex justify-center items-center'>

            <button type='Submit' className='w-[300px] border-2 
           border-slate-500 p-3
            font-bold hover:bg-sky-500'
            >SignUp
            </button>

          </div>

          <div className='flex'>

            <p className='hover:underline '>if you already have an account ?</p>

            <Link to ="/auth/auth-login">

              <p className='text-blue-600'>log in</p>

           </Link>

          </div>

        </form>

      </div>

    </div>



  )
}

export default SignUp;




