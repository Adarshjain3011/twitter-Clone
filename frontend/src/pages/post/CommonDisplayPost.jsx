import { useEffect, useState } from "react";
import PostServices from "../../services/PostService";
import PostBottomSection from "./PostBottomSection";
import InfiniteScroll from "react-infinite-scroll-component";

import { formatDate } from "../../utils/formatDate";

import ImageCarousel from "../../components/common/ImageCarousel";

import Loading from "../../components/common/Loading";

import { useNavigate } from "react-router-dom";

const CommonPostDisplay = ({ fetchDataPost }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const navigate = useNavigate();

    const fetchData = async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            let res = await fetchDataPost(page);
            const data = res.data.data;

            console.log("page no is ", page);

            console.log("data is ", data);

            setItems((prevItems) => [...prevItems, ...data]);
            setHasMore(data.length > 0);
        } catch (err) {
            console.log("Error fetching data:", err);
        } finally {
            setLoading(false);
        }

        setPage((prevPage) => prevPage + 1);
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="relative w-full border border-gray-700 text-white rounded-lg mt-14">

            <InfiniteScroll
                dataLength={items.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<Loading></Loading>}
                endMessage={<p className="text-center text-gray-400">No more posts</p>}
                scrollableTarget="scrollableDiv"
            >
                {items.map((data, index) => (
                    <div key={index} className="flex flex-col border border-gray-700 items-start space-x-4 p-4">
                        <div className="flex gap-4" onClick={()=>{
                            
                            navigate(`/profile/${data.name}`);

                        }}>
                            <img
                                src={data?.user?.userImage}
                                alt={data?.user?.name || "User"}
                                className="h-8 w-8 rounded-full md:h-12 md:w-12"
                            />
                            <div>

                                <div className="flex items-center space-x-2">
                                    <span className="font-bold text-white text-xs md:text-xl text-nowrap">{data?.user?.name}</span>
                                    <span className="text-gray-400 text-[8px] md:text-lg">@{data?.user?.name} · {formatDate(data?.createdAt)}</span>
                                </div>

                                {

                                    data?.postUrl?.length > 0 && <div className="mt-3 w-full bg-cover border border-gray-700 rounded-2xl p-3 shadow-2xl">

                                        <ImageCarousel images={data?.postUrl}></ImageCarousel>

                                    </div>

                                }


                                {data?.image && (
                                    <div className="mt-3">
                                        <img
                                            src={data?.image}
                                            alt="Post"
                                            className="rounded-lg w-full"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="pl-12 py-4 ">
                            <PostBottomSection
                                likeCount={data?.likes?.length}
                                commentCount={data?.comments?.length}
                            />
                        </div>
                    </div>
                ))}
            </InfiniteScroll>

        </div>
    );
};

export default CommonPostDisplay;
