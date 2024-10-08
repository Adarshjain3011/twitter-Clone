import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

// import { displayAllUserPost } from "../../redux/slices/Post";

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

import { useLocation } from "react-router-dom"

// import { FcLikePlaceholder } from 'react-icons/fc';

const DisplayAllPost = ({ }) => {


  const navigate = useNavigate();


  const location = useLocation();

  const imageFileType = ["txt", "pdf", "doc", "png", "jpg", "jpeg", "PNG"];

  const [items, setitems] = useState([]); // nbkjgiug

  const [userProfile, setUserProfile] = useState('');

  const [isLoading, setIsloading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(0);

  const authData = useSelector((state) => state.auth.data);
  const isLoader = useSelector((state) => state.auth.loading);
  const isError = useSelector((state) => state.auth.isError);

  let userID = (authData?.data)?.data?._id;

  console.log("current user all posts", items);


  async function fetchAllUserPosts(currentIndex) {

    try {

      let userName = location.pathname.replace("%20", " ").split("/")[location.pathname.replace("%20", " ").split("/").length - 1];

      console.log("next call ke liye ready ");

      setIsloading(true);

      const response = await PostServices.getUserLikedPosts(userName, currentIndex);

      console.log("response ka data in likes ", (response.data).data.length);

      setIsloading(false);

      setitems((prevItems) => [...prevItems, (response.data).data]);

      console.log("response ke data ki length likes  ke andar  ", items);

      (response.data).data.length > 0 ? setHasMore(true) : setHasMore(false);


    }

    catch (error) {


      console.log(error);

      if (error.response.status === 400) {

        // toast.warning("token not found ");
        // navigate("/");

        console.log("error aaa gaya ");

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

      let updatedItems = [...items[0]];

      // Find the post object with the matching postId
      let updatedPostIndex = updatedItems.findIndex(post => post._id === postId);

      if (updatedPostIndex !== -1) {
        // Retrieve the likes array for the post
        let newLikeArray = [...updatedItems[updatedPostIndex].likes];

        // If user liked the post, add user's ID to the likes array
        if (isInclude) {
          newLikeArray.push(userID);
          toast.success("User liked successfully");
        } else {
          // If user unliked the post, remove user's ID from the likes array
          newLikeArray = newLikeArray.filter(like => like !== userID);
          toast.warning("User unliked the post");
        }

        // Update the likes array for the post
        updatedItems[updatedPostIndex].likes = newLikeArray;

        // Update the state with the modified items array
        setitems([updatedItems]);

        console.log("new items array is ", items);

      }
    } catch (error) {

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
        <div className='bg-black flex flex-col border border-white/20 w-full h-full'>

          {/*  top div  */}

          {

            items.map((postData) => (


              <div className='bg-black flex border border-white/15 w-full relative h-auto'>


                <div className='w-full'>

                  {

                    // console.log(data)
                    postData.map((postData) => (

                      <div className='flex border border-b'>

                        <div className='w-[11%] flex rounded-full relative pl-3 pt-3'>

                          <div className='w-[40px] h-[40px] rounded-full bg-white/75 flex justify-center items-center'>

                            <img src={postData.user.userImage} alt="" className='w-full h-full bg-cover' />

                          </div>

                        </div>

                        <div className='w-[90%] relative flex flex-col pt-4 gap-2'>


                          {/* <div className='relative h-auto'> */}

                          {/*  all posts data  */}

                          {console.log(postData)}

                          <p>{postData.description}</p>

                          {/* </div> */}

                          {/* <p>hellow </p> */}

                          <div className='flex overflow-auto'>

                            <div className='flex overflow-x-auto relative w-[600px]  max-w-maxContent gap-4'>

                              {
                                postData?.postUrl?.map((data, index) => (


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

                          <div className='flex relative justify-between'>

                            {/* all logos image  */}
                            <div className='flex w-full justify-between p-2'>


                              <abbr title='reply' className='text-start '>

                                <div className='w-[40px] h-[40px] rounded-full hover:bg-slate-500/85 flex justify-center items-center'>

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

export default DisplayAllPost


