
const express = require("express");

const router = express.Router();

const {

    createPost,
    deletePost,
    deleteCommentFromPost,
    createComment,
    likeUnlikePost,
    // unlikePost,
    bookMarkPost,
    removebookMarkedPost,
    addLikeToComment,
    addCommentToComment,
    getAllUserPosts,
    getUserLikedPosts,
    getAllPosts,
    searchUser

                    
} = require("../controller/Post");

const {Auth} = require("../middleware/auth");

const {userProfileButtonDescribe,performFollowUnfollow,findAllUserWhichFollowedEachOther} = require("../controller/User")

router.post("/createPost",Auth,createPost);

router.post("/deletePost/:postId",Auth,deletePost);

router.post("/createComment",Auth,createComment);

router.post("/deleteComment",Auth,deleteCommentFromPost);

router.post("/likeUnlikePost/:postId",Auth,likeUnlikePost);

// router.post("/unlikePost/:postId",Auth,unlikePost);

router.post("/bookMarkPost/:postId",Auth,bookMarkPost);

router.post("/removebookMarkedPost/:postId",Auth,removebookMarkedPost);

router.post("/addLikeToComment",Auth,addLikeToComment);

router.post("/addCommentToComment",Auth,addCommentToComment);

router.get("/getAllUserPosts",Auth,getAllUserPosts);

router.get("/getUserLikedPosts",getUserLikedPosts);


router.get("/getAllPosts",getAllPosts);

router.get("/userProfileButtonDescribe",userProfileButtonDescribe);

router.post("/performFollowUnfollow",performFollowUnfollow);

router.post("/findUser/:search?",Auth,searchUser);




router.get("/findAllUserWhichFollowedEachOther",Auth,findAllUserWhichFollowedEachOther);




module.exports = router;








