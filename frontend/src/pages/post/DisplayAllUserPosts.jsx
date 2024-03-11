import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { displayAllUserPost } from "../../redux/slices/Post";

import PostServices from '../../services/PostService';
import AuthServices from '../../services/AuthService';

import { MdDelete } from "react-icons/md";

import { RxCross2 } from "react-icons/rx";

import { CiSettings } from "react-icons/ci";

import { FaLocationDot } from 'react-icons/fa6';

import { BiWorld } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import { MdEmojiEmotions } from "react-icons/md";

import gif from "../../assets/gif.png";
import shedule from "../../assets/shedule.png";

import ContentLoaders from "../../components/common/Loader";

import { FaRegComment } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { MdGraphicEq } from "react-icons/md";

import { CiBookmark } from "react-icons/ci";
import { TbShare2 } from "react-icons/tb";


import InfiniteScroll from "react-infinite-scroll-component"

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useLocation } from 'react-router-dom';

const DisplayAllUserPosts = () => {



    const navigate = useNavigate();

    const location = useLocation();

    console.log(location.pathname);

    const authData = useSelector((state) => state.auth.data);
    const isLoader = useSelector((state) => state.auth.loading);
    const isError = useSelector((state) => state.auth.isError);

    let userName = location.pathname.replace("%20", " ").split("/")[location.pathname.replace("%20", " ").split("/").length - 1];

    const imageFileType = ["txt", "pdf", "doc", "png", "jpg", "jpeg", "PNG"];

    const [items, setitems] = useState([]); // nbkjgiug

    let userID = (authData?.data)?.data?._id;

    const [userProfile, setUserProfile] = useState('');

    const [isLoading, setIsloading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(0);



    console.log("current user all posts", items);


    async function fetchAllUserPosts(currentIndex) {

        try {

            console.log("next call ke liye ready ");

            setIsloading(true);

            const response = await PostServices.getAlluserPosts(userName, currentIndex);

            console.log("response ka data in  get AllUserPosts ", ((response.data).data.userImage));

            setUserProfile((response.data).data.userImage);

            setIsloading(false);

            console.log("response ke data ki length ", (response.data).posts);

            setitems((prevItems) => [...prevItems, (response.data).data]);

            ((response.data).data.posts).length > 0 ? setHasMore(true) : setHasMore(false);


        }

        catch (error) {

            console.log(error);

            if (error.response.status === 400) {

                toast.warning("token not found ");
                navigate("/");

            }

        }

        setIndex(currentIndex + 1);

    }



    async function likeHandler(postId) {

        try {
            console.log("post id is ", postId);

            const response = await PostServices.addLikeDislikePost(postId);

            console.log("liked and dislike added successfully", response);

            console.log("auth ak adata like ke andar ", (authData?.data)?.data?._id);

            console.log("like hai bhai  ", (response?.data)?.data?.likes.includes(userID));

            let isInclude = (response?.data)?.data?.likes.includes(userID);

            let updatedItems = [...items];

            // Find the post object with the matching postId


            if(isInclude){

                toast.success("user like the post ")

            }

            else{

                toast.warning("usr unlike the post ");
                
            }

                updatedItems.forEach(user => {
                    
                    // Find the index of the post object with the matching postId
                    const postIndex = user.posts.findIndex(post => post._id === postId);
            
                    if (postIndex !== -1) {

                        // Check if the user ID already exists in the likes array
            
                        if (isInclude) {

                            // If the user hasn't liked the post, like it
                            user.posts[postIndex].likes.push(userID);

                            // toast.success("user like the post ");


                        } else {

                            // If the user already liked the post, unlike it
                            user.posts[postIndex].likes = user.posts[postIndex].likes.filter(id => id !== userID);

                            // toast.warning("usr unlike the post ");

                        }

                    }
                    else {

                        console.log(`Post with ID ${postId} not found in user's posts`);

                    }

                });

                setitems(updatedItems);

                console.log("new items are ",items);

            
        } 
        catch (error) {

            console.log(error);
        }
    }


    useEffect(() => {

        fetchAllUserPosts(0);

    }, [])


    return (

        <div>

            <InfiniteScroll

                dataLength={items.length}
                next={() => fetchAllUserPosts(index)}
                hasMore={hasMore}
                loader={<ContentLoaders></ContentLoaders>}
            >
                {/* <div className='w-[200px] h-[300px] bg-red-600 absolute z-30'></div> */}


                <div className='bg-black flex flex-col border border-white/20 w-full h-full'>

                    {/*  top div  */}

                    {

                        items.map((data) => (


                            <div className='bg-black flex border border-white/15 w-full relative h-auto'>



                                {/* data->post ke upar map  */}

                                <div className='w-full'>

                                    {

                                        // console.log(data)
                                        data.posts.map((postData) => (

                                            <div className='flex border border-b'>

                                                <div className='w-[11%] flex rounded-full relative pl-3 pt-3'>

                                                    <div className='w-[40px] h-[40px] rounded-full bg-white/75 flex justify-center items-center'>

                                                        <img src={userProfile} alt="" className=' w-full h-full bg-cover rounded-full' />

                                                    </div>

                                                </div>

                                                <div className='w-[90%] relative flex flex-col pt-4 gap-2'>


                                                    {/* <div className='relative h-auto'> */}

                                                    {/*  all posts data  */}

                                                    <p>{postData.description}</p>

                                                    {/* </div> */}

                                                    {/* <p>hellow </p> */}

                                                    <div className='flex overflow-auto'>

                                                        <div className='flex overflow-x-auto relative w-[600px]  max-w-maxContent gap-4'>

                                                            {
                                                                postData.postUrl.map((data, index) => (


                                                                    <div className='relative w-[580px] h-[200px] rounded-xl'>

                                                                        <MdDelete className='absolute right-5 w-[40px] h-[40px] text-black top-0'></MdDelete>

                                                                        {
                                                                            imageFileType.includes(data.split(".")[data.split(".").length - 1]) ? (<img src={data} className=' max-w-[580px]

                                                                     min-w-[580px] h-[200px] bg-cover rounded-xl'></img>) : (<video className=' max-w-[580px]
                                                                      min-w-[580px] h-[200px] bg-cover rounded-xl' width="320" height="240" controls>

                                                                                <source src={data} type="video/webm"></source>

                                                                            </video>)


                                                                        }

                                                                    </div>


                                                                ))
                                                            }

                                                        </div>

                                                    </div>


                                                    {/* <div className='w-full bg-white/55 h-1 '>

                                                    </div> */}

                                                    <div className='flex relative justify-between'>

                                                        {/* all logos image  */}
                                                        <div className='flex w-full justify-between p-2'>


                                                            <abbr title='reply' className='text-start '>

                                                                <div className='w-[40px] h-[40px] rounded-full hover:bg-slate-500/85 flex justify-center items-center' onClick={() => clickCommentHandler(userProfile, postData.description)}>

                                                                    <FaRegComment className='text-xl'></FaRegComment>

                                                                </div>




                                                            </abbr>

                                                            <abbr title='repost'>

                                                                <div className='w-[40px] h-[40px] rounded-full hover:bg-slate-500/85 flex justify-center items-center'>

                                                                    <BiRepost className='text-xl'></BiRepost>

                                                                </div>


                                                            </abbr>

                                                            <abbr title="like">

                                                                <div className='w-[40px] h-[40px] rounded-full hover:bg-slate-500/85 flex justify-center items-center'>

                                                                    {


                                                                        postData?.likes?.includes(userID) ? (<FcLike className='text-xl'
                                                                            onClick={() => likeHandler(postData._id)}></FcLike>) : (<FcLikePlaceholder className='text-xl'
                                                                                onClick={() => likeHandler(postData._id)}></FcLikePlaceholder>)
                                                                    }

                                                                    <p>{postData?.likes?.length}</p>

                                                                </div>


                                                            </abbr>

                                                            <abbr title='view' className=''>

                                                                <div className='w-[40px] h-[40px] rounded-full hover:bg-slate-500/85 flex justify-center items-center'>

                                                                    <MdGraphicEq className='text-xl'></MdGraphicEq>

                                                                </div>


                                                            </abbr>

                                                            <div className='flex'>


                                                                <abbr title="boomark">

                                                                    <div className='w-[40px] h-[40px] rounded-full hover:bg-slate-500/85 flex justify-center items-center'>

                                                                        <CiBookmark className='text-xl'></CiBookmark>

                                                                    </div>


                                                                </abbr>

                                                                <abbr title='view' className=''>

                                                                    <div className='w-[40px] h-[40px] rounded-full hover:bg-slate-500/85 flex justify-center items-center'>

                                                                        <TbShare2 className='text-xl'></TbShare2>

                                                                    </div>


                                                                </abbr>

                                                            </div>


                                                        </div>
                                                        {/* post ke button wala div */}


                                                    </div>

                                                </div>
                                            </div>


                                        ))
                                    }

                                </div>

                            </div>

                        ))
                    }

                </div>

                {/* <div className='w-[]'></div> */}
            </InfiniteScroll>

        </div>

    )
}

export default DisplayAllUserPosts;






