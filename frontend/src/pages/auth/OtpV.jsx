import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form';

import timer from "../../assets/stopwatch.gif";

import { useLocation } from "react-router-dom";

import AuthServices from '../../services/AuthService';

import {useNavigate} from "react-router-dom";


const OtpVerificationForm = () => {

    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm();

    const [otp,setOtp] = useState('');

    const navigate = useNavigate();


    const location = useLocation();

    const emailData = location.state;

    console.log("data is ",emailData);


    const onSubmit = async(data) => {


        console.log(data);
        
        let otp = Object.values(data).reduce((acc, value) => acc + value, '');
        
        console.log(otp);

        // const email = data.email;

        const email = emailData.email;
        console.log("new email is ",email);

        await AuthServices.authVerifyOtp({ otp,email }).then((data)=>{

            console.log("response from sendOtp",data);

            navigate("/");

        });

    };

    const [timer, setTimer] = useState(30);


    // let timeLeft = 30;
    // var elem = document.getElementById('some_div');
    
     
    
    function countdown() {

      if (timer === 0) {

        return ;

      } else {
        
        setTimer(timer-1);

      }

    }

    setTimeout(countdown, 1000);

    return (

        <div className='w-full min-h-screen flex justify-center items-center bg-[#161D29]'>

            <div className='flex w-[600px]  gap-7 flex-col border-2 shadow-2xl p-6'>

                <h1 className='text-center text-4xl font-semibold'>Otp Verification </h1>

                <p className='text-center'>Enter the otp for verification which has been sent tot your gmail</p>


                <form className='flex gap-16 justify-center items-center flex-col' onSubmit={handleSubmit(onSubmit)}>

                    <div className='flex gap-4 justify-center items-center'>


                        <input type='text' name='first' {...register("first")} maxLength={1}

                            className='h-[80px] w-[60px] text-2xl text-center bg-zinc-700 rounded-md flex justify-center items-center'
                        />

                        <input type='text' name='second' {...register("second")} maxLength={1}

                            className='h-[80px] w-[60px]
                     bg-zinc-700 rounded-md flex justify-center items-center
                      text-2xl text-center'  />

                        <input type='text' name='third' {...register("third")} maxLength={1}

                            className='h-[80px] w-[60px] bg-zinc-700
                     rounded-md flex justify-center items-center
                      text-2xl text-center'
                        />

                        <input type='text' name='fourth' {...register("fourth")} maxLength={1}

                            className='h-[80px] w-[60px] bg-zinc-700
                     rounded-md flex justify-center
                      items-center text-2xl text-center'
                        />

                        <input type='text' name='fifth' {...register("fifth")} maxLength={1}

                            className='h-[80px] w-[60px] bg-zinc-700
                     rounded-md flex justify-center items-center
                      text-2xl text-center'

                        />

                    </div>

                    <div className='flex justify-center items-center gap-6'>


                        <div>

                            {
                                timer > 0 ? (
                                
                                <div>



                                    {timer}

                                    <video>
                                        <source src={timer}/>
                                    </video>

                                    
                                </div>
                                    )
                                    :
                                    (
                                    <button type='Submit'

                                className='w-[250px] border-2 
                                 border-slate-500 p-3
                                font-bold hover:bg-sky-500'
                            >
                                Resend Otp

                            </button>)
                                
                            }

                        </div>

                        <button type='Submit'

                            className='w-[250px] border-2 
                        border-slate-500 p-3
                        font-bold hover:bg-sky-500'
                        >
                            verfiy Otp

                        </button>




                    </div>

                </form>


            </div>

        </div>

    )
}

export default OtpVerificationForm

