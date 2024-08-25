import { useEffect, useState } from "react";
import PostServices from "../../services/PostService";
import PostBottomSection from "./PostBottomSection";
import InfiniteScroll from "react-infinite-scroll-component";

import {formatDate} from "../../utils/formatDate";

const CommonPostDisplay = ({ fetchDataPost }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

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
        <div className="relative w-full border border-gray-700 text-white rounded-lg">

            <InfiniteScroll
                dataLength={items.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<p className="text-center text-gray-400">Loading...</p>}
                endMessage={<p className="text-center text-gray-400">No more posts</p>}
                scrollableTarget="scrollableDiv"
            >
                {items.map((data, index) => (
                    <div key={index} className="flex flex-col border border-gray-700 items-start space-x-4 p-4">
                        <div className="flex gap-4">
                            <img
                                src={data?.user?.userImage}
                                alt={data?.user?.name || "User"}
                                className="h-12 w-12 rounded-full"
                            />
                            <div>
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold text-white">{data?.user?.name}</span>
                                    <span className="text-gray-400">@{data?.user?.name} · {formatDate(data?.createdAt)}</span>
                                </div>
                                <p className="mt-1 text-white">
                                    {data?.content || "Post content"}
                                </p>
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
                        <div>
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
