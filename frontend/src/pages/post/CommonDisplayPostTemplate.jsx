import React from 'react'

const CommonDisplayPostTemplate = () => {

    return (

        <div>

            <InfiniteScroll

                dataLength={allUserPostData.length}
                next={fetchAllUserPosts}
                hasMore={hasMore}
                loader={<ContentLoaders></ContentLoaders>}
            >
                <div className='bg-black flex flex-col border border-white/20 w-full h-full'>

                    {/*  top div  */}

                    {

                        allUserPostData.map((data) => (


                            <div className='bg-black flex border border-white/15 w-full relative h-auto'>



                                {/* data->post ke upar map  */}



                                <div>

                                    {

                                        // console.log(data)
                                        data.posts.map((postData) => (

                                            <div className='flex border border-b'>

                                                <div className='w-[11%] flex rounded-full relative pl-3 pt-3'>

                                                    <div className='w-[40px] h-[40px] rounded-full bg-white/75 flex justify-center items-center'>

                                                        <img src={userProfile} alt="" />

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

                                                                    <FcLike className='text-xl' onClick={() => likeHandler(postData._id)}></FcLike>
                                                                    <p>{postData.likes.length}</p>

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

export default CommonDisplayPostTemplate



