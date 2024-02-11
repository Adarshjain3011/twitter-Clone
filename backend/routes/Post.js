
const express = require("express");

const router = express.Router();

const {

    createPost,
    deletePost,
    deleteCommentFromPost,
    createComment,
    likePost,
    unlikePost,
    bookMarkPost,
    removebookMarkedPost,
    addLikeToComment,
    addCommentToComment,

                    
} = require("../controller/Post");

const {Auth} = require("../middleware/auth");


router.post("/createPost",Auth,createPost);

router.post("/deletePost/:postId",Auth,deletePost);

router.post("/createComment",Auth,createComment);

router.post("/deleteComment",Auth,deleteCommentFromPost);

router.post("/likePost/:postId",Auth,likePost);

router.post("/unlikePost/:postId",Auth,unlikePost);

router.post("/bookMarkPost/:postId",Auth,bookMarkPost);

router.post("/removebookMarkedPost/:postId",Auth,removebookMarkedPost);

router.post("/addLikeToComment",Auth,addLikeToComment);

router.post("/addCommentToComment",Auth,addCommentToComment);


module.exports = router;






