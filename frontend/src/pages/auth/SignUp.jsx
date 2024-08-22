import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import InputBox from '../../components/common/InputBox';
import Button from '../../components/common/Button';
import AuthServices from '../../services/AuthService';
import abc from '../../assets/ximage.png';

const SignUp = () => {
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({});
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log('Signup data:', data);

    const userData = {
      email: data.email
    };

    try {
      const response = await AuthServices.authSignup(data);
      console.log('Signup response:', response.data);
      navigate('/auth/auth-otpVerificationForm', { state: userData, replace: true });
    } catch (error) {
      console.log('Signup error:', error);
      if (error?.response?.status === 301) {
        navigate('/auth/auth-otpVerificationForm', { state: userData, replace: true });
      } else {
        toast.error('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className='w-screen bg-black min-h-screen flex justify-center items-center bg-cover'>
      <div className='flex flex-col justify-center items-center m-auto gap-5'>
        <div className='flex justify-center'>
          <div className='w-[40px] h-[40px] rounded-full'>
            <img src={abc} alt="Profile" className='w-full h-full bg-cover rounded-full' />
          </div>
        </div>
        <form className='flex flex-col justify-center items-center gap-10' onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-3xl font-bold text-center'>Create your account</h1>
          <InputBox
            placeholder="Enter your name"
            name="name"
            type="text"
            register={register}
            errors={errors}
          />
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
            <p className='hover:underline'>If you already have an account?</p>
            <Link to="/auth/auth-login">
              <p className='text-blue-600 ml-2'>Log in</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
