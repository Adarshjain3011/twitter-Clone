import React, { useState } from 'react';

import { useForm } from "react-hook-form";

import { CiSearch } from 'react-icons/ci';
import AuthServices from '../services/AuthService';
import PostServices from '../services/PostService';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { useNavigate } from 'react-router-dom';

import ComboBox from '../components/common/Combobox';


const SearchBarContainer = () => {


    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [click, setClick] = useState(false);

    const [searchResult, setSearchResult] = useState([]);

    const [Loading, setLoading] = useState(false);


    const onSubmit = async (data) => {

        console.log(data);
    }



    async function changeHandler(event) {

        try {

            console.log(event.target.value);

            setLoading(true);


            let response = await PostServices.findUser(event.target.value);

            console.log(response.data);


            setSearchResult(response.data);


            setLoading(false);



        }
        catch (error) {

            console.log(error);

        }
    }




    function moveToUserProfile(name) {

        navigate(`/profile/${name}`);

    }



    return (

        <div className='w-[600px] mt-2'>


            <ComboBox></ComboBox>

            <div className='relative w-full'>

                <div className='realtive flex flex-col mt-16 shadow-2xl border-2 border-white/[0.2] shadow-white/[0.2] rounded-xl bg-black p-4 gap-3 '>

                    <h1 className='font-extrabold text-2xl'>Subscribe to Premium</h1>

                    <p className='text-wrap font-semibold'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>

                    <button

                        className='w-[150px] border-2 
                    bg-sky-500 p-1
                    font-bold rounded-full'
                    >
                        Subscribe

                    </button>

                </div>

            </div>


        </div>
    )
}

export default SearchBarContainer



