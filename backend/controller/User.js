const User = require("../model/User");

exports.createFollow = async(req,res)=>{

    try{


        // fetch the data 

        const userId = req.user._id;

        const userToBeFollow = req.params.userToBeFollow;

        // validate the data 


        if(!userToBeFollow){

            return res.status(400).json({

                success: false,
                data: null,
                message: "all fields are not fullfilled ",

            })


        }

        const userExists = await User.findById(userToBeFollow);

        // check user to be follow is exists or not 

        if(!userExists){

            return res.status(400).json({

                success: false,
                data: null,
                message: "this userid is not valid  ",

            })
        }

        // check user exists or not 

        const UserDetails = await User.findById(userId);

        if(!UserDetails){

            return res.status(400).json({

                success: false,
                data: null,
                message: "this userid is not valid  ",
    
            })
            
        }


        const follow = UserDetails.following.includes(userExists._id);

        

        if(follow){

            UserDetails.following.pop(userExists._id);

            const upadateUserDetails = await User.findByIdAndUpdate(userToBeFollow,{

                $pull:{

                    followers:userId,

                }
            })

        }

        else{

            UserDetails.following.push(userExists._id);

            const upadateUserDetails = await User.findByIdAndUpdate(userToBeFollow,{

                $push:{

                    followers:userId,

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

    catch(error){

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "their is something error while  ",

        })
    }
}



