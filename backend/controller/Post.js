

const User = require("../model/User");

const Post = require("../model/Post");

const { UploadImageToCloudinary } = require("../utils/Cloudinary");

const Comment = require("../model/Comment");
const { default: mongoose } = require("mongoose");


// create post 

exports.createPost = async (req, res) => {

    try {

        // fetech the data 

        const userId = req.user._id;

        const { description } = req.body;

        // validate the user id

        if (!userId) {

            return res.status(400).json({

                success: false,
                data: null,

                message: "all fileds are not fullfill ",

            })
        }

        // check user exists or not 

        const userExists = await User.findById(userId);

        if (!userExists) {

            return res.status(400).json({

                success: false,
                data: null,

                message: "this user id not exists  ",

            })
        }


        // create a new Post 

        const newPost = await Post.create({ user: userExists._id });


        console.log("new post ", newPost);

        if (description !== undefined) {

            newPost.description = description;

        }


        if (req.files && req.files.video !== undefined) {


            console.log("video", req.files.video);

            const uploadResponse = await UploadImageToCloudinary(req.files.video, process.env.FOLDER_NAME);


            console.log("uplaod response", uploadResponse);

            newPost.postUrl = uploadResponse.secure_url;

            // newPost.timeDuration = uploadResponse.time_duration;

            if (uploadResponse.time_duration !== undefined) {

                newPost.timeDuration = uploadResponse.time_duration;

            }

        }


        // upadate the new post 

        await newPost.save();

        // this post also add to the user Posts 

        const updateUser = await User.findByIdAndUpdate(userId, {

            $push: {

                posts: newPost._id,

            }

        }, { new: true });


        console.log("upadteUser ", updateUser)


        // successfully return the response 

        return res.status(200).json({

            success: true,
            data: updateUser,
            message: "post created successfully "

        })


    }

    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "there is something error while creating th post  "

        })

    }
}



//delete Post 



exports.deletePost = async (req, res) => {

    try {

        // fetech the data 

        const userId = req.user._id;

        const postId = req.params.postId;

        console.log(postId);

        // validate the data

        if (!userId || !postId) {

            return res.status(400).json({

                success: false,
                data: null,

                message: "all fileds are not fullfill ",

            })
        }

        // check user exists or not 

        const userExists = await User.findById(userId);

        if (!userExists) {

            return res.status(400).json({

                success: false,
                data: null,

                message: "this user id not exists  ",

            })
        }


        const newPostid1 = postId.trim();

        const newPostId = new mongoose.Types.ObjectId(newPostid1);


        // delete comment from Comment Schema

        console.log("hellow1");

        const deleteComment = await Comment.deleteMany({ post: newPostId });


        console.log("comment data ", deleteComment);



        // update the exiting user by removing this post id 

        // if(!deleteComment){

        //     return res.status(400).json({

        //         success: false,
        //         data: null,

        //         message: "this post id is not exists in Comment  ",

        //     })
        // }

        // delete post from post schema 

        const deleteFromPostSchema = await Post.findByIdAndDelete(newPostId);

        console.log("deleteFromPostSchema", deleteFromPostSchema);

        if (!deleteFromPostSchema) {

            return res.status(400).json({

                success: false,
                data: null,

                message: "this post id is not valid  ",

            })

        }

        console.log("hellow");

        // update the user post by removing the post 

        const updateUser = await User.findByIdAndUpdate(userId, {

            $pull: {

                posts: {

                    $elemMatch: {

                        newPostId

                    }
                }

            }
        }, { new: true });


        console.log("new post ", updateUser);


        // successfully return the response 

        return res.status(200).json({

            success: true,
            data: updateUser,
            message: `post deleted successfully  ${postId}`

        })

    }

    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "there is something error while deleting the post  ",
            error: error.message,


        })

    }
}




// like Controller

exports.likePost = async (req, res) => {


    try {

        const userId = req.user._id;

        const postId = req.params.postId;

        if (!userId || !postId) {

            return res.status(400).json({

                success: false,
                data: null,

                message: "all fileds are not define ",

            })

        }
        const findUser = await User.findById(userId);

        if (!findUser) {

            return res.status(400).json({

                success: false,
                data: null,
                message: " this user is not exists   "

            })
        }

        const findPost = await Post.findByIdAndUpdate(postId, {

            $push: {

                likes: findUser._id,

            }
        }, { new: true });


        if (!findPost) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "this post is not exists  "

            })
        }

        return res.status(200).json({

            success: false,
            data: findPost,
            message: "Post Liked Successfully"

        })


    }

    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "there is something error while like the post  "

        })

    }
}






// unlike Post 

exports.unlikePost = async (req, res) => {

    try {


        const userId = req.user._id;

        const postId = req.params.postId;

        if (!userId || !postId) {

            return res.status(400).json({

                success: false,
                data: null,

                message: "all fileds are not define ",

            })

        }
        const findUser = await User.findById(userId);

        if (!findUser) {

            return res.status(400).json({

                success: false,
                data: null,
                message: " this user is not exists   "

            })
        }

        const findPost = await Post.findByIdAndUpdate(postId, {

            $pull: {

                comments: findUser._id,

            }
        }, { new: true });


        if (!findPost) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "this post is not exists  "

            })
        }

        return res.status(200).json({

            success: false,
            data: findPost,
            message: "Post UnLiked Successfully"

        })

    }

    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "there is something error while like the post  "

        })

    }
}


// add the BOOKmark 


exports.bookMarkPost = async (req, res) => {


    try {

        const userId = req.user._id;

        const postId = req.params.postId;

        if (!userId || !postId) {

            return res.status(400).json({

                success: false,
                data: null,

                message: "all fileds are not define ",

            })

        }
        const findUser = await User.findById(userId);

        if (!findUser) {

            return res.status(400).json({

                success: false,
                data: null,
                message: " this user is not exists   "

            })
        }

        const findPost = await Post.findByIdAndUpdate(postId, {

            $push: {

                bookMarked: findUser._id,

            }
        }, { new: true });


        if (!findPost) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "this bookmark is not exists  "

            })
        }

        return res.status(200).json({

            success: false,
            data: findPost,
            message: "Bookmark addedd  Successfully"

        })
    }

    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "there is something error while bookmark the post  "

        })

    }
}






exports.removebookMarkedPost = async (req, res) => {

    try {

        const userId = req.user._id;

        const postId = req.params.postId;

        if (!userId || !postId) {

            return res.status(400).json({

                success: false,
                data: null,

                message: "all fileds are not define ",

            })

        }
        const findUser = await User.findById(userId);

        if (!findUser) {

            return res.status(400).json({

                success: false,
                data: null,
                message: " this user is not exists   "

            })
        }

        const findPost = await Post.findByIdAndUpdate(postId, {

            $pull: {

                bookMarked: findUser._id,

            }
        }, { new: true });


        if (!findPost) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "this bookmark is not exists  "

            })
        }

        return res.status(200).json({

            success: false,
            data: findPost,
            message: "Bookmark remove  Successfully"

        })
    }

    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "there is something error while removeing the bookmark of the post   "

        })

    }
}


// create new comment


exports.createComment = async (req, res) => {

    try {

        // fetch the data 


        const userId = req.user._id;

        // const postId = req.params.postId;

        const { postId, description } = req.body;

        //validate the data 

        if (!userId || !postId) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "all fileds are not define ",

            })

        }


        const findUser = await User.findById(userId);

        //check user exists or not

        if (!findUser) {

            return res.status(400).json({

                success: false,
                data: null,
                message: " this user is not exists   "

            })
        }
        
        const findPost = await Post.findById(postId);

        // check post exists or not 

        if (!findPost) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "this post id is not exists  is not exists  "

            })
        }

        // create the comment Schema 

        const createComment = await Comment.create({

        
            post: findPost._id,

        });


        if(description !== undefined){

            createComment.description = description;

        }

        if(req.files && req.files.file !== undefined){

            const uploadResponse = await UploadImageToCloudinary(process.env.FOLDER_NAME,req.files.video);

            createComment.url = uploadResponse.secure_url;

            if(uploadResponse.time_duration !==undefined){

                createComment.timeDuration = uploadResponse.time_duration;

            }


        }

        await createComment.save();


        // check this comment exists or not 

        if (!createComment) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "there is something error while Comment on  the post  "

            })
        }

        // update the existing post with new comment 

        const updatePost = await Post.findByIdAndUpdate(postId, {

            $push: {

                comments: createComment._id,

            }
        }, { new: true });


        return res.status(200).json({

            success: false,
            data: updatePost,
            message: "comment created and addedd to the post Successfully"

        })
    }

    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "there is something error while bookmark the post  "

        })

    }
}


// delete existing comment 



exports.deleteCommentFromPost = async (req, res) => {

    try {

        // fetch the data 

        const { commentId } = req.body;

        //validate the data 

        if ( !commentId) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "all fileds are not define ",

            })

        }

        // delete comment from commment Schema 

        const deleteComment = await Comment.findByIdAndDelete(commentId);

        if (!deleteComment) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "this comment id is not valid "

            })
        }


        console.log("delete Comment ",deleteComment);
        // update the post by removing the comment from the post 

        const updatePost = await Post.findByIdAndUpdate({_id:deleteComment.post}, {

            $pull: {

                comments: commentId,

            }

        }, { new: true }).populate("comments").exec();


        // check post exists or not 

        if (!updatePost) {

            return res.status(400).json({

                success: false,
                data: null,
                message: " this post is not valid "

            })

        }

        // check that user

        return res.status(200).json({

            success: false,
            data: updatePost,
            message: "comment deleted and also remove from  the post Successfully"

        })
    }

    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "there is something error while bookmark the post  "

        })

    }
}



exports.addLikeToComment = async(req,res)=>{


    try{

        const userId = req.user._id;

        const {commentId} = req.body;

        if(!commentId){

            
            return res.status(400).json({

                success: false,
                data: null,
                message: "all fileds are not define ",

            })

        }


        const commentAlreadyExists = await Comment.findById(commentId);


        if(commentAlreadyExists){

            const exists = commentAlreadyExists.likes.includes(userId);

            if(exists){

                commentAlreadyExists.likes.pop(userId);

            }

            else{

                commentAlreadyExists.likes.push(userId);

            }
        }

        else{

            return res.status(400).json({

                success: false,
                data: null,
                message: "this comment id is not valid  "
    
            })

        }
    
        await commentAlreadyExists.save();


        return res.status(200).json({

            success: true,
            data:null,
            message: " Successfully updated comment like or dislike   "

        })


    }

    catch(error){

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "there is something error while add like to  the Comment   "

        })

    }
}



// add comment to comment 


exports.addCommentToComment = async(req,res)=>{

    try{

        const userId = req.user._id;

        // const postId = req.params.postId;

        const { commentId, description } = req.body;

        //validate the data 

        if (!userId || !commentId) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "all fileds are not define ",

            })

        }

        console.log("comment id",commentId);

        const findUser = await User.findById(userId);

        //check user exists or not

        if (!findUser) {

            return res.status(400).json({

                success: false,
                data: null,
                message: " this user is not exists   "

            })
        }
        
        const findComment = await Comment.findById(commentId);

        // check Comment exists or not 

        if (!findComment) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "this Comment id is not exists "

            })
        }

        // create the comment Schema 

        const createComment = await Comment.create({});


        if(description !== undefined){

            createComment.description = description;

        }

        if(req.files && req.files.file !== undefined){

            const uploadResponse = await UploadImageToCloudinary(process.env.FOLDER_NAME,req.files.video);

            createComment.url = uploadResponse.secure_url;

            if(uploadResponse.time_duration !==undefined){

                createComment.timeDuration = uploadResponse.time_duration;

            }


        }

        await createComment.save();


        // check this comment exists or not 

        if (!createComment) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "there is something error while Comment on  the post  "

            })
        }

        // update the existing post with new comment 

        const updateComment = await Comment.findByIdAndUpdate(commentId, {

            $push: {

                comment: createComment._id,

            }
        }, { new: true });


        return res.status(200).json({

            success: false,
            data: updateComment,
            message: "comment created and added to the post Successfully"

        })

    }

    catch(error){

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "there is something error while add comment to  the Comment   "

        })

    }
}




