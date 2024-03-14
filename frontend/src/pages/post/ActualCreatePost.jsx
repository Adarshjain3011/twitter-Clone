import React from 'react'
import { MdDelete } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { BiWorld } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import { MdEmojiEmotions } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';

import { useState } from 'react';
import CreatePost from './CreatePost';

import gif from "../../assets/gif.png";

import shedule from "../../assets/shedule.png";

import { FaLocationDot } from 'react-icons/fa6';
import { createPost } from '../../redux/slices/Post';
import PostServices from '../../services/PostService';
import { toast } from 'react-toastify';



const ActualCreatePost = () => {

    const [imagesUrl, setImagesUrl] = useState([]);

    const [actualImage, setActualImage] = useState([]);

    const [count, setCount] = useState(4);

    const [textAreaData, setTextAreaData] = useState('');

    console.log("text area ka data ", textAreaData);

    // const dispatch = useDispatch();

    // const postData = useSelector((state) => state.post.data);
    // const loading = useSelector((state) => state.post.loading);
    // const isError = useSelector((state) =>state.post.isError);

    async function createPostHandler() {

        if (textAreaData === "" && actualImage.length === 0) {

            toast.warn("plz add some data to the post ");
            return;

        }

        console.log("create post ke andar ");

        console.log("post description ", textAreaData);

        const forms = new FormData();


        // forms.append("description of user post ", textAreaData);

        forms.append("description", textAreaData);

        for (const file of actualImage) {

            console.log("each file", file[0]);

            forms.append('video', file[0], file[0].name);

            // Example with optional filename

        }

        const allData = forms.getAll('video');

        console.log("all data", allData);

        console.log("all from data ", forms);


        // now we create the post

        try {

            let response = await PostServices.createPost(forms);

            toast.success("post created successfully ");

            console.log("posts created successfully ", response);

        }

        catch (error) {

            console.log(error);

        }


    }



    function removeImageHandler(data, ind) {


        console.log("remove image handler ke andar ");

        console.log(data[0]);

        const new_Array = imagesUrl.filter((val, index) => index !== ind);

        setImagesUrl([new_Array]);

        console.log("new Array is ", new_Array);

        setCount(count + 1);

        console.log("count value ", count);// setCount((imageUrl.length - new_Array)-1)

        console.log(new_Array);
    }


    function fileAccessHandler() {

        var input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt, .pdf, .doc , .png , .jpg ,.jpeg ,.PNG,mp4,webm'; // specify accepted file types if needed

        input.multiple = true;  // Allow selecting multiple files


        input.onchange = function (event) {

            if (event.target.files) {
                const selectedImages = Array.from(event.target.files);

                if (selectedImages.length > 4 || (count - selectedImages.length < 0)) {

                    toast.warning("Please Choose Upto 4 Photos ,videos or gifs");
                    return;
                }
                const imageUrls = selectedImages.map((file) => URL.createObjectURL(file));
                setCount(count - selectedImages.length);

                setImagesUrl([...imagesUrl, imageUrls]);


                console.log("updated image url ", imagesUrl);

                setActualImage([...actualImage, selectedImages]);

            }

        };
        input.click();

    }



    function autoExpandTextarea(element) {

        console.log("autoExpandTextarea called");
        if (!element) {
            console.error("Textarea element is undefined or null");
            return;
        }

        console.log("Expanding textarea:", element);

        setTextAreaData(element.value);
        element.style.height = 'auto'; // Reset the height to auto to properly calculate the new height
        element.style.height = (element.scrollHeight) + 'px'; // Set the height to the scroll height of the content
    }

    window.onload = function () {
        console.log("Window loaded");
        var textarea = document.querySelector('.textarea');
        if (textarea) {
            textarea.addEventListener('input', function (event) {
                console.log("Input event triggered");
                autoExpandTextarea(this);

                console.log("Textarea value:", event.target.value);

                try {

                    console.log("textAreaData updated successfully.");
                } catch (error) {
                    console.error("Error updating textAreaData:", error);
                }
            });
        } else {
            console.error("Textarea element not found.");
        }
    }



    return (

        <div className='bg-black w-full mt-16'>

            <div className='flex relative h-auto w-[550px]'>

                <div className='w-[9%] flex rounded-full relative pl-3 pt-3'>

                    <div className='w-[40px] h-[40px] rounded-full bg-white/75 flex justify-center items-center'>

                        <FaUser></FaUser>

                    </div>

                </div>

                <div className='w-[500px] relative flex flex-col pt-4 gap-2'>


                    {/* <div className='relative h-auto'> */}


                    <textarea type='text' placeholder='What is happening?'
                        className='outline-none border-none textarea
                    bg-black overflow-y-hidden
                     text-2xl w-[300px] min-h-[30px]' onInput={event => autoExpandTextarea(event.target)}></textarea>


                    {/* </div> */}

                    {/* <p>hellow </p> */}

                    <div className='flex overflow-auto'>

                        <div className='flex overflow-x-auto relative w-[550px]  max-w-maxContent gap-4'>

                            {
                                imagesUrl.length > 0 && imagesUrl.map((data, index) => (


                                    <div className='relative w-[400px] h-[200px] rounded-xl'>

                                        <MdDelete className='absolute right-5 w-[40px] h-[40px] text-black top-0' onClick={() => removeImageHandler(data, index)}></MdDelete>



                                        <img src={data} className=' max-w-[400px] min-w-[400px] h-[200px] bg-cover rounded-xl'></img>

                                    </div>

                                ))
                            }

                        </div>

                    </div>


                    <div className='flex font-bold relative items-baseline gap-1'>

                        <BiWorld className='text-blue-700 text-end'></BiWorld>
                        <p className='text-blue-700'>Everyone can reply</p>

                    </div>

                    <div className='w-full bg-white/55 h-1 '>

                    </div>

                    <div className='flex relative justify-between'>

                        {/* all logos image  */}
                        <div className='flex gap-3'>


                            <abbr title='image' className='text-start '>

                                <div className='w-[30px] h-[30px] rounded-full hover:bg-slate-500/85 flex justify-center items-center'>

                                    <CiImageOn id='fileButton' onClick={fileAccessHandler}></CiImageOn>

                                </div>


                            </abbr>

                            <abbr title='gif'>

                                <div className='w-[30px] h-[30px] rounded-full hover:bg-slate-500/85 flex justify-center items-center'>

                                    <img src={gif} alt="" className=' bg-white/30 w-[20px] h-[20px]' />

                                </div>


                            </abbr>

                            <abbr title="emoji">

                                <div className='w-[30px] h-[30px] rounded-full hover:bg-slate-500/85 flex justify-center items-center'>

                                    <MdEmojiEmotions></MdEmojiEmotions>

                                </div>


                            </abbr>

                            <abbr title='shedule' className=''>

                                <div className='w-[30px] h-[30px] rounded-full hover:bg-slate-500/85 flex justify-center items-center'>

                                    <img src={shedule} alt="" className=' bg-white/30 w-[20px] h-[20px]' />

                                </div>


                            </abbr>


                            <div className='w-[30px] h-[30px] rounded-full hover:bg-slate-500/85 flex justify-center items-center'>

                                <FaLocationDot></FaLocationDot>

                            </div>

                        </div>
                        {/* post ke button wala div */}

                        <div>

                            <button

                                className='w-[80px] border-2 
                            bg-sky-500 p-1
                            font-bold rounded-full'
                                onClick={createPostHandler}>
                                post

                            </button>

                        </div>

                    </div>

                </div>

                
            </div>


        </div>
    )
}

export default ActualCreatePost


