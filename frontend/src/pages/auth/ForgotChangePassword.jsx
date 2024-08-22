import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import abc from "../../assets/ximage.png";
import AuthServices from '../../services/AuthService';
import InputBox from '../../components/common/InputBox'; // Import the InputBox component
import Button from '../../components/common/Button';

const ForgotChangePassword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const emailData = location.state;

    const onSubmit = async (data) => {
        const wholeData = {
            currentPassword: data.currentPassword,
            confirmPassword: data.confirmPassword,
            email: emailData,
        };

        try {
            const response = await AuthServices.authForgotPassword(wholeData);
            console.log("Password changed successfully", response);
            navigate("/auth/auth-login");
        } catch (error) {
            console.log("Error in changing password", error);
        }
    };

    return (
        <div className='w-full h-full bg-black min-h-screen flex justify-center items-center bg-cover'>
            <div className='w-[600px] flex flex-col justify-center items-center h-[600px] m-auto gap-5'>
                <div className='flex justify-center'>
                    <div className='w-[40px] h-[40px] rounded-full'>
                        <img src={abc} alt="" className='w-full h-full bg-cover rounded-full' />
                    </div>
                </div>

                <form className='flex flex-col justify-center items-center gap-10' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-3xl font-bold text-center'>Change Your Password</h1>

                    <InputBox
                        type='password'
                        placeholder='Enter your new Password'
                        name='currentPassword'
                        register={register}
                        errors={errors}
                    />

                    <InputBox
                        type='password'
                        placeholder='Enter your Confirm Password'
                        name='confirmPassword'
                        register={register}
                        errors={errors}
                    />

                    <Button clickHandler={handleSubmit(onSubmit)}>Change Password</Button>

                </form>
            </div>
        </div>
    );
};

export default ForgotChangePassword;


