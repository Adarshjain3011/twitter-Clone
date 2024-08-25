
import React from 'react' ;

import { FaHeart, FaRetweet, FaComment, FaShare } from "react-icons/fa";

const PostBottomSection = ({likeCount,commentCount}) => {
    return (

        <div className="flex absolute pb-3 justify-between text-gray-400 gap-6">
            <div className="flex items-center space-x-1">
                <FaComment className="h-5 w-5" />
                <span>{commentCount}</span>
            </div>
            {/* <button className="flex items-center space-x-1 hover:text-green-500">
                <FaRetweet className="h-5 w-5" />
                <span>8.7K</span>
            </button> */}
            <div className="flex items-center space-x-1 ">
                <FaHeart className="h-5 w-5" />
                <span>{likeCount}</span>
            </div>
            {/* <button className="flex items-center space-x-1 hover:text-blue-500">
                <FaShare className="h-5 w-5" />
                <span>22M</span>
            </button> */}
        </div>

    )
}

export default PostBottomSection;


