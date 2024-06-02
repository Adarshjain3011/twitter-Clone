import React from 'react'

// import { MdDelete } from "react-icons/md";
// import { GoHome } from "react-icons/go";
// import { CiSettings } from "react-icons/ci";
// import { RxCross2 } from "react-icons/rx";
// import { BiWorld } from "react-icons/bi";
// import { FaUser } from "react-icons/fa";
// import { CiImageOn } from "react-icons/ci";
// import { MdOutlineGifBox } from "react-icons/md";
// import { MdEmojiEmotions } from "react-icons/md";

// import { createPost } from '../../redux/slices/Post';
// import { useSelector,useDispatch } from 'react-redux';

import { useState } from 'react';

import gif from "../../assets/gif.png";

// import shedule from "../../assets/shedule.png"
// import { FaLocationDot } from 'react-icons/fa6';
import CreatePostTopBar from './CreatePostTopBar';
import ActualCreatePost from './ActualCreatePost';

const CreatePost = () => {


    const [currentState, setCurrentState] = useState("for you");
    // const [imagesUrl, setImagesUrl] = useState([]);
    // const [actualImage, setActualImage] = useState([]);

    // const [count, setCount] = useState(4);
    // const [textAreaData, setTextAreaData] = useState('');

    // const dispatch = useDispatch();

    // const postData = useSelector((state) => state.post.data);
    // const loading = useSelector((state) => state.post.loading);
    // const isError = useSelector((state) =>state.post.isError);

    // async function createPostHandler() {

    //     console.log("create post ke andar ");

    //     console.log("post description ",textAreaData);

    //     const forms = new FormData();


    //     forms.append("description", textAreaData);

    //     for (const file of actualImage) {

    //         console.log("each file",file[0]);

    //         forms.append('video', file[0], file[0].name);

    //         // Example with optional filename

    //     }

    //     const allData = forms.getAll('video');

    //     console.log("all data", allData);

    //     console.log("all from data ", forms);

    

    //     await dispatch(createPost(forms));

    //     if(!loading){

    //         console.log("created post ka data ",postData);
    //     }
        



    // }


    
    // function  removeImageHandler (data,ind){


    //     console.log("remove image handler ke andar ");

    //     console.log(data[0]);

    //    const new_Array =  imagesUrl.filter((val,index) => index!==ind );

    //    setImagesUrl([new_Array]);

    //    console.log("new Array is ",new_Array);

    //     setCount(count+1);

    //    console.log("count value ",count);// setCount((imageUrl.length - new_Array)-1)
        
    //    console.log(new_Array);
    // }


    // function fileAccessHandler() {

    //     var input = document.createElement('input');
    //     input.type = 'file';
    //     input.accept = '.txt, .pdf, .doc , .png , .jpg ,.jpeg ,.PNG,mp4,webm'; // specify accepted file types if needed

    //     input.multiple = true;  // Allow selecting multiple files


    //     input.onchange = function (event) {

    //         if (event.target.files) {
    //             const selectedImages = Array.from(event.target.files);

    //             if (selectedImages.length > 4 || (count - selectedImages.length < 0)) {

    //                 toast.warning("Please Choose Upto 4 Photos ,videos or gifs");
    //                 return;
    //             }
    //             const imageUrls = selectedImages.map((file) => URL.createObjectURL(file));
    //             setCount(count - selectedImages.length);

    //             setImagesUrl([...imagesUrl, imageUrls]);


    //             console.log("updated image url ", imagesUrl);

    //             setActualImage([...actualImage, selectedImages]);

    //         }

    //     };
    //     input.click();

    // }



    // function autoExpandTextarea(element) {

    //     console.log("hellow 2");

    //     // console.log(element);

    //     element.style.height = 'auto'; // Reset the height to auto to properly calculate the new height
    //     element.style.height = (element.scrollHeight) + 'px'; // Set the height to the scroll height of the content

    //     console.log(element);

    // }


    // window.onload = function () {

    //     console.log("helow 1")
    //     var textarea = document.querySelector('.textarea');
    //     textarea.addEventListener('input', function (event) {
    //         autoExpandTextarea(this);

    //         console.log(event.target.value);

    //         setTextAreaData(event.target.value);

    //     });
    // }

    return (

        <div className='w-full'>

            <div className='bg-black flex flex-col border-2 border-white/15 h-full relative w-[500px]'>

                {/*  top div  */}

                {/* sectionn 2.1 */}
{/* 
                <div className='bg-black flex border border-white/15 h-16 justify-center items-center sticky top-0 z-10'>
                    

                    <div className='flex w-[90%] relative'>

                        
                        <div className='flex flex-col justify-center items-center text-white font-bold trans w-[50%] hover:bg-white/10 h-16 ' onClick={() => setCurrentState("for you")} >

                            <button className='outline-none border-none'>
                                For you
                            </button>


                            {currentState == "for you" && <div className='absolute w-[60px] h-1 bg-indigo-600 bottom-0 rounded-full' > </div>}


                        </div>

                        <div className='flex flex-col justify-center relative  items-center text-white font-bold w-[50%] hover:bg-white/10 h-16' onClick={() => setCurrentState("following")}>

                            <button className='outline-none border-none' >

                                Following

                            </button>


                            {currentState == "following" && <div className='absolute w-[60px] h-1 bg-indigo-600 bottom-0 rounded-full' > </div>}



                        </div>

                    </div>

                    <div className='w-[10%] flex h-9 justify-center items-center text-white rounded-full hover:bg-white/10'>

                        <CiSettings></CiSettings>

                    </div>

                </div> */}

                <CreatePostTopBar></CreatePostTopBar>


                {/* sectionn 2.2 */}

                <ActualCreatePost></ActualCreatePost>


            </div>

        </div>
    )
}

export default CreatePost

