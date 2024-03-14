import React, { useEffect, useState } from 'react'

import { FaVideo } from "react-icons/fa6";

import { PiPhonePlusBold } from "react-icons/pi";

import { HiDotsVertical } from "react-icons/hi";

import { IoMdSend } from "react-icons/io";

import { useLocation, useNavigate } from 'react-router-dom';
import AuthServices from '../../services/AuthService';
import { toast } from 'react-toastify';

const ChatPage = () => {

    const navigate = useNavigate();

    const location = useLocation();


    const [newMessageData, setNewMessageData] = useState('');


    console.log("data is ", location.state);

    const [allMessage, setAllMessage] = useState([]);


    function moveToUserProfileHandler(name) {


        navigate(`/profile/${name}`);


    }


    async function createChatBwUser() {

        let response = await AuthServices.accessChat(location.state.id);

        console.log(response);


    }



    async function fetchChatsBwUser() {

        let response = await AuthServices.fetchChats();

        console.log("find the chats ", (response?.data?.data)[0]?.latestMessage);

        setAllMessage((response?.data?.data)[0]?.latestMessage);



    }



    async function createNewMessage(messageContent, recieverId) {

        // messageContent,recieverId

        console.log(messageContent, recieverId);

        try {

            let response = await AuthServices.createMessage({ messageContent, recieverId });

            console.log("messag k adata ",response.data.data);


            // now we have to add this new message to the existing chat 

            setAllMessage([...allMessage,response.data.data]);



            setNewMessageData("");


            // toast.success("")

        }

        catch (error) {

            console.log(error);

        }

    }




    function createMessageHandler(event) {

        setNewMessageData(event.target.value);


    }


    function findActualTime(timestamp) {

        const date = new Date(timestamp);

        // Convert UTC time to local time
        const localDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
        
        // Extract hours and minutes
        const hours = localDate.getHours();
        const minutes = localDate.getMinutes();

        console.log(localDate);
        
        // Format hours and minutes as "HH:mm" string
        const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        
        return timeString; // Output: 18:33


        // return desiredTime

    }



    useEffect(() => {


        createChatBwUser();

        fetchChatsBwUser();



    }, []);


    return (

        <div className='w-full min-h-screen'>

            <div className=' relative w-[500px] border-x border-b '>

                {/* navbar has two sections  */}

                {/*  first section  */}


                <div className=' flex justify-between sticky top-0 p-3 bg-black border'>

                    <div className=' relative flex gap-3 bg-black'>

                        <div className='w-[40px] h-[40px] rounded-full' onClick={() => moveToUserProfileHandler(location?.state?.name)}>

                            <img src={location?.state?.image} alt="" className='w-full h-full rounded-full bg-cover' />

                        </div>

                        <div className=' relative flex flex-col gap-2'>

                            <h1>{location?.state?.name}</h1>

                            <p><span>Email : </span>{location?.state?.email}</p>

                        </div>

                    </div>

                    {/* section 2 */}

                    <div className='flex gap-4 p-4'>

                        <FaVideo className='text-xl'></FaVideo>
                        <PiPhonePlusBold className='text-xl'></PiPhonePlusBold>

                        <HiDotsVertical className='text-xl'></HiDotsVertical>

                    </div>

                </div>


                {/*  Content portion  */}

                <div className='w-full h-[500px] max-h-fit border overflow-y-auto'>

                    {allMessage.length > 0 ? (

                        allMessage.map((data) => (

                            <div key={data._id} className=''>

                                {data.Sender._id == location.state.id ? (

                                    <div className=' flex justify-start m-3'>

                                        <div className='bg-gray-800/55 w-[200px] p-3 rounded-2xl'>

                                            <p>{data.content}</p>
                                            <p className='text-end'>{findActualTime(data.createdAt)}</p>

                                        </div>

                                    </div>
                                ) : (
                                    <div className='flex items-end justify-end m-3 '>
                                        <div className=' bg-green-900/75 w-[200px] rounded-2xl p-3'>

                                            <p>{data.content}</p>

                                            <p className='text-end'>{findActualTime(data.createdAt)}</p>


                                        </div>

                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No messages to display</p>
                    )}
                </div>



                {/*  bottom  portion  */}


            </div>

            <div className='flex p-2 justify-between bg-black fixed bottom-5 w-[500px] border'>

                <div>

                    <input type="text" className='text-xl pl-4 p-2 w-[350px] rounded-xl' placeholder='Enter the message' value={newMessageData} onChange={createMessageHandler} />

                </div>

                <div className='flex w-[120px] p-2 bg-blue-700 justify-center items-center rounded-xl gap-4' onClick={() => createNewMessage(newMessageData, location?.state?.id)}>

                    <p className='text-xl font-bold'>Send</p>

                    <IoMdSend></IoMdSend>

                </div>

            </div>

        </div>
    )
}

export default ChatPage



