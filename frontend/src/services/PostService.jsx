
import {fileUploadData, jsonData} from "./HttpCommon";

const createPost = async(data)=>{

    return fileUploadData.post('/createPost',data);

}


const getAlluserPosts = async(userName,index)=>{

    console.log(userName,index);

    return fileUploadData.get(`/getAllUserPosts?index=${index}&userName=${userName}`);

}

const addLikeDislikePost = async(postId)=>{

    return fileUploadData.post(`/likeUnlikePost/${postId}`);

}

const getUserLikedPosts = async(data,index)=>{

    return fileUploadData.get(`/getUserLikedPosts?userName=${data}&index =${index}`);

}

const getAllPosts = async(index)=>{

    console.log("value of index ",index);

    return fileUploadData.get(`/getAllPosts?index =${index}`);
}


const userProfileButtonDescribe = async(originalUser,newUser)=>{

    return jsonData.get(`/userProfileButtonDescribe?newUser=${newUser}&originalUser=${originalUser}`);

}

const performFollowUnfollow = async(originalUser,newUser)=>{

    return jsonData.post(`/performFollowUnfollow?newUser=${newUser}&originalUser=${originalUser}`);

}

const findUser = async(data)=>{

    return jsonData.post(`/findUser?search=${data}`);

}


const findAllUserWhichFollowedEachOther = async()=>{

    return jsonData.get("/findAllUserWhichFollowedEachOther");
    

}


const PostServices = {

    createPost,
    getAlluserPosts,
    addLikeDislikePost,
    getUserLikedPosts,
    getAllPosts,
    userProfileButtonDescribe,
    performFollowUnfollow,
    findUser,
    findAllUserWhichFollowedEachOther

}

export default PostServices;






