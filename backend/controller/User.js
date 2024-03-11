const AdditionalDetails = require("../model/AdditionalDetails");
const User = require("../model/User");

const { UploadImageToCloudinary } = require("../utils/Cloudinary")

require("dotenv").config();

exports.createFollow = async (req, res) => {

    try {


        // fetch the data 

        const userId = req.user._id;

        const userToBeFollow = req.params.userToBeFollow;

        // validate the data 


        if (!userToBeFollow) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "all fields are not fullfilled ",

            })


        }

        const userExists = await User.findById(userToBeFollow);

        // check user to be follow is exists or not 

        if (!userExists) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "this userid is not valid  ",

            })
        }

        // check user exists or not 

        const UserDetails = await User.findById(userId);

        if (!UserDetails) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "this userid is not valid  ",

            })

        }


        const follow = UserDetails.following.includes(userExists._id);



        if (follow) {

            UserDetails.following.pop(userExists._id);

            const upadateUserDetails = await User.findByIdAndUpdate(userToBeFollow, {

                $pull: {

                    followers: userId,

                }
            })

        }

        else {

            UserDetails.following.push(userExists._id);

            const upadateUserDetails = await User.findByIdAndUpdate(userToBeFollow, {

                $push: {

                    followers: userId,

                }
            })

        }

        await UserDetails.save();

        return res.status(200).json({

            success: false,
            data: UserDetails,
            message: "it successfully manage follow and unfollow feature  ",

        })

    }

    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "their is something error while  ",

        })
    }
}




exports.updateUserProfile = async (req, res) => {

    try {

        const userId = req.user._id;

        const { bio, ContactNo, Dob, gender, city } = req.body;

        console.log(req.body);

        if (req?.files?.userImage) {


            let response = await UploadImageToCloudinary(req.files.userImage, process.env.FOLDER_NAME);

            let userExists = await User.findByIdAndUpdate(userId, {

                userImage: response?.secure_url,

            }, { new: true }).exec();


        }

        const userExists = await User.findById(userId);

        const additionalDetails = userExists.addtionalDetails;


        const newAdditionalDetails = await AdditionalDetails.findById(additionalDetails);


        if (bio) {

            newAdditionalDetails.bio = bio;

        }
        if (city) {

            newAdditionalDetails.city = city;

        }
        if (gender) {

            newAdditionalDetails.gender = gender;

        }

        if (ContactNo) {

            newAdditionalDetails.ContactNo = ContactNo;

        }

        if (Dob) {

            newAdditionalDetails.Dob = Dob;

        }


        await newAdditionalDetails.save();


        // console.log("additional details ",upadteAdditonalDetails);

        const newUpdatedAdditionalDetails = await AdditionalDetails.findById(additionalDetails);

        // const updatedUser = await User.findById(userId).select("name,additionalDetails").populate('additionalDetails');

        return res.status(200).json({

            success: true,
            data: newAdditionalDetails,
            message: "additonal Details upadyed successfully "

        })


    }
    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "some error while Updating the user addtional details  "

        })

    }
}



exports.getUserProfileDetails = async (req, res) => {


    try {

        // console.log("req.body ",req.body);

        console.log("helow brother ");

        console.log(req.query);
        const { userName } = req.query

        console.log("user name is ", userName);

        if (!userName) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "fileds are empty "

            })

        }

        
        let userExists = await User.find({ name: userName }).select("name email posts addtionalDetails userImage followers following").populate("addtionalDetails").exec();

        // userExists.posts = userExists?.posts?.length;

        console.log("user posts ", userExists);

        // let len = userExists[0].posts.length;

        let userPostsLength = userExists[0]?.posts?.length;

        // userExists[0].posts = [];   


        console.log("user posts length ", userPostsLength);

        if (!userExists) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "this user does not exists  "

            })
        }


        return res.status(200).json({

            success: true,
            data: { userExists, userPostsLength },
            message: "user profile data fetch successfully ",

        })

    }
    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "some error while fetching user profile data"

        })
    }
}



exports.userProfileButtonDescribe = async (req, res) => {

    try {

        // let originalUser = req.user._id;
        // let newUser = req.body.newUser;

        const { newUser, originalUser } = req.query;


        console.log("new user and original user ",newUser,originalUser);

        if (!originalUser || !newUser) {


            return res.status(400).json({

                success: false,
                data: null,
                message: "all are not fullfiled "

            })
        }

        let originalUserExists = await User.findOne({ name: originalUser });

        let newUserExists = await User.findOne({ name: newUser });

        if (!originalUserExists || !newUserExists) {


            return res.status(404).json({

                success: false,
                data: null,
                message: "given users are not exists "

            })

        }

        // 1. we check agar ye new user ushke followers ke andar pada hoga then we show follwing button

        // const isNewUserAlreadyFollowed = await User.findById({ likes: { $in: [userExists._id] } })

        // let isNewUserAlreadyFollowedOriginalUser = originalUserExists.followers.includes(newUserExists._id);

        let isNewUserAlreadyFollowedOriginalUser = originalUserExists.followers.includes(newUserExists._id);


        let isNewUserAlreadyFollowedByOriginalUser = newUserExists.following.includes(newUserExists._id);


        // case 1 agar dono hi ek dooshre ko follow naii karte 

        if (!isNewUserAlreadyFollowedByOriginalUser && !isNewUserAlreadyFollowedOriginalUser) {

            // tab hum UI pe follow button show karayenge 

            console.log("helolow 1");

            return res.status(200).json({ // 304 when no users followed each other

                success: true,
                data: "304",
                message: "no two users followed each other "
            })

        }
        else if (isNewUserAlreadyFollowedOriginalUser) {

            console.log("helolow 2");

            return res.status(200).json({ // 305 when newUser already  followed original user then we show folowing button 

                success: true,
                data: "305",
                message: "newUser already  followed original user"

            })

        }

        else if (isNewUserAlreadyFollowedByOriginalUser) {

            console.log("helolow 3");

            return res.status(200).json({ // 306 when newUser already  followed by original user then we show followback  button 

                success: true,
                data: "306",

                message: "newUser already  followed by original user"

            })
        }



    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,
            data: null,
            message: "their is something error while describe user state in profile ",
            error: error.message,

        })

    }
}




exports.performFollowUnfollow = async (req, res) => {

    try {

        const { newUser, originalUser } = req.query;

        if (!originalUser || !newUser) {


            return res.status(400).json({

                success: false,
                data: null,
                message: "all are not fullfiled "

            })


        }



        let originalUserExists = await User.findOne({ name: originalUser });

        let newUserExists = await User.findOne({ name: newUser });

        if (!originalUserExists || !newUserExists) {


            return res.status(404).json({

                success: false,
                data: null,
                message: "given users are not exists "

            })

        }

        let isNewUserAlreadyFollowedOriginalUser = originalUserExists.followers.includes(newUserExists._id);

        let isOriginalUserAlreadyHasNewUser = newUserExists.following.includes(originalUserExists._id);

        let updateOriginalUserFollowers;

        let upadateNewUserFollowing;


        if (isNewUserAlreadyFollowedOriginalUser && isOriginalUserAlreadyHasNewUser) {

            // update Original user Followers 

            updateOriginalUserFollowers = await User.findByIdAndUpdate(originalUserExists._id, {

                $pull: {

                    followers: newUserExists._id

                }
            }, { new: true });

            // upadte new user following 


            upadateNewUserFollowing = await User.findByIdAndUpdate(newUserExists._id, {

                $pull: {

                    following: originalUserExists._id,

                }
            }, { new: true });


        }
        else {

            // update Original user Followers 

            updateOriginalUserFollowers = await User.findByIdAndUpdate(originalUserExists._id, {

                $push: {

                    followers: newUserExists._id

                }
            }, { new: true });

            // upadte new user following 

            upadateNewUserFollowing = await User.findByIdAndUpdate(newUserExists._id, {

                $push: {

                    following: originalUserExists._id,

                }
            }, { new: true });

        }

        return res.status(200).json({

            success:true,
            data:{upadateNewUserFollowing,updateOriginalUserFollowers},
            message:"follow and unfollow handled successfully ",

        })



    }
    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            data: null,
            message: "their is while handling follow unfollow ",
            error: error.message,


        })
    }
}






