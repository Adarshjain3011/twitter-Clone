import React, { useEffect, useState } from 'react'
import AuthServices from '../../services/AuthService';

const Notification = () => {


    const [allNotification, setAllNotification] = useState([]);

    async function getUserAllNotification() {

        try {

            let response = await AuthServices.getUserAllNotifications();

            console.log("all notification are ", response.data.data);

            setAllNotification(response.data.data);



        }
        catch (error) {

            console.log(error);


        }
    }



    useEffect(() => {

        getUserAllNotification();

    }, [])


    return (


        <div className='w-full'>

            <div className='w-[500px] max-h-screen border bg-cover rounded-xl'>


                {

                    allNotification?.length < 0 ?

                        (
                            <div> no data found </div>
                        )
                        :
                        (

                            <div>


                                {

                                    allNotification.map((data) => (

                                        <div className='flex flex-col p-3 rounded-xl gap-2'>

                                            <div className='flex  items-center gap-3'>

                                                <div className='w-[40px] h-[40px]'>

                                                    <img src={data?.recieverId?.userImage} alt="" className='w-full h-full bg-cover rounded-full'/>

                                                </div>

                                                <h1 className='text-xl font-bold'>{data?.recieverId?.name}</h1>

                                            </div>


                                            <div className='flex items-center'>

                                                <p className='font-bold pl-12'>{data?.content}</p>


                                            </div>


                                        </div>
                                    ))
                                }

                            </div>

                        )

                }

            </div>

        </div>
    )
}

export default Notification;







