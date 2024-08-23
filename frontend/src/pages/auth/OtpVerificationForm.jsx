import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import timerImage from "../../assets/stopwatch.gif";
import { useLocation, useNavigate } from "react-router-dom";
import AuthServices from '../../services/AuthService';
import OtpInput from 'react-otp-input';
import { PiTimerBold } from "react-icons/pi";
import { toast } from 'react-toastify';
import Button from '../../components/common/Button';

const OtpVerificationForm = () => {
    const { register, handleSubmit } = useForm();
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const emailData = location.state;
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (timer > 0) setTimer(timer - 1);
        }, 1000);
        return () => clearInterval(countdown);
    }, [timer]);

    async function submitHandler(event) {
        event.preventDefault();
        const email = emailData.email;
        await AuthServices.authVerifyOtp({ otp, email })
            .then(() => {
                toast.success("User successfully verified!");
                navigate("/auth/auth-login");
            })
            .catch(() => {
                toast.error("Please enter the correct OTP.");
            });
    }

    async function clickHandler() {
        try {
            await AuthServices.authSendOtp(emailData.email);
            toast.success("OTP sent successfully!");
            setTimer(30);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-screen min-h-screen flex justify-center items-center bg-[#161D29]'>
            <div className='flex flex-col w-fit max-w-md md:max-w-lg lg:max-w-xl gap-7 border-2 border-gray-700 shadow-2xl p-8 bg-[#1F2937] rounded-lg'>
                <h1 className='text-center text-3xl md:text-4xl font-semibold text-white'>OTP Verification</h1>
                <p className='text-center text-gray-400'>Enter the OTP sent to your email for verification</p>
                <form className='flex justify-center items-center'>
                    <OtpInput

                        value={otp}
                        onChange={setOtp}
                        numInputs={5}
                        renderSeparator={<span className='p-5'></span>}
                        renderInput={(props) => <input {...props}
                            className=' text-xl font-bold text-center
                          bg-zinc-700 rounded-md flex
                           justify-center items-center placeholder:text-sm'/>
                        }
                        inputStyle={{

                            width: "60px",
                            height: "60px"
                        }}
                    />
                </form>

                <div className='flex justify-between items-center gap-6'>
                    {timer > 0 ? (
                        <div className='flex gap-2 text-2xl text-white justify-center items-center'>
                            <PiTimerBold className='text-blue-500' />
                            <span>{timer}s</span>
                        </div>
                    ) : (
                        <Button clickHandler={clickHandler} >
                            Resend OTP
                        </Button>
                    )}
                    <Button clickHandler={submitHandler}>
                        Verify OTP
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OtpVerificationForm;


