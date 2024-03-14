import React, { useEffect, useState } from 'react';

import { useForm } from "react-hook-form";

import { CiSearch } from 'react-icons/ci';

import { BsPersonPlusFill } from "react-icons/bs";

import { useNavigate } from 'react-router-dom';
import PostServices from '../../services/PostService';

const SearchUser = () => {


    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors } } = useForm();

    const [bothSideFollowUsers, setBothSideFollowUsers] = useState([]);



    async function changeHandler(event) {

        try {

            console.log(event.target.value);

            setLoading(true);


            let response = await PostServices.findUser(event.target.value);

            console.log(response.data.data);


            setSearchResult(response.data.data);


            setLoading(false);



        }
        catch (error) {

            console.log(error);

        }
    }


    const onSubmit = async (data) => {

        console.log(data);

    }





    async function findAllUserWhichFollowedEachOther() {

        try {

            let response = await PostServices.findAllUserWhichFollowedEachOther();

            console.log(response.data.data);

            setBothSideFollowUsers(response?.data?.data);


        }
        catch (error) {

            console.log(error);

        }

    }







    function moveToChatPageHandler(image,name,email,id){


        let userData = {

            "image":image,
            "name":name,
            "email":email,
            "id":id

        }

        navigate("/chatPage", { state: userData });

        
    }




    function moveToUserProfileHandler(name) {


        navigate(`/profile/${name}`);


    }




    useEffect(() => {


        findAllUserWhichFollowedEachOther();


    }, [])



    return (

        <div className='w-full '>

            <div className=" relative w-[555px] border border-t-0 h-screen">

                <div className='flex gap-3 mt-3 pl-3 pr-3 border-b-2 border-x pb-4 fixed top-0 bg-black'>

                    <form className='flex flex-col gap-10 ' onSubmit={handleSubmit(onSubmit)}>

                        <div className='flex justify-center items-center ' onClick={() => setClick(!click)}>

                            <CiSearch className='text-xl absolute left-6 w-7 h-7'></CiSearch>

                            <input type='text' placeholder='Search the user by name' name='name'

                                {...register("name", { required: "name is required" })} className='w-[350px] p-2 pl-10 
                                `rounded-md outline-none border rounded-full bg-[#202327] font-semibold
                                text-2xl focus-within:border-blue-600' onChange={changeHandler}>

                            </input>

                        </div>

                    </form>

                    <div className='flex justify-center items-center bg-sky-800/70 p-2 rounded-xl w-[150px]'>

                        <BsPersonPlusFill className="w-[30px] h-[30px] "></BsPersonPlusFill>

                        <p className="text-xl">Group</p>

                    </div>

                </div>

                <div>


                    <div className="flex flex-col mt-16">

                        <div className='flex flex-col gap-2 p-2 rounded-lg'>

                            {
                                bothSideFollowUsers.map((data, index) => (

                                    <div className='flex gap-3 mt-3 bg-blue-700/80 rounded-xl p-2
                                        hover:bg-[#16181c]'onClick={()=>moveToChatPageHandler(data.userImage,data.name,data.email,data._id)}>

                                        <div className='w-[40px] h-[40px] rounded-full' onClick={()=>moveToUserProfileHandler(data.name)}>

                                            <img src={data.userImage}  alt="" className='w-full h-full rounded-full bg-cover' />

                                        </div>


                                        <div className='flex flex-col gap-2'>

                                            <h1>{data.name}</h1>

                                            <p><span>Email:</span>{data.email}</p>


                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )


}


export default SearchUser
