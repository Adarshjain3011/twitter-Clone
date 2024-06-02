const express = require("express");

// const User = require('../model/User');

const router = express.Router();

const User = require("../model/User");


    //******************************************************************* all middlewares *************************************************

const {

    Auth

    } = require("../middleware/auth.js");  



//********************************************************* All user route with controller ************************************************************ */

const {updateUserProfile,getUserProfileDetails, getUserDetails} = require("../controller/User.js");


const {
    
    signUp,
    logIn,
    sendOtp,
    resendOtp,
    VerifyOtp,
    logOut,
    resetPassword,
    forgotPassword,
    


} = require("../controller/Auth");




router.post("/signup",signUp);

router.post("/verifyOtp",VerifyOtp);

router.post("/login",logIn);

router.post("/sendOtp",async(req,res)=>{

    await sendOtp(req.body.email);

});

router.post("/resendOtp",resendOtp);

router.get("/authToken",Auth,async(req,res)=>{

    console.log("hellow ");

    if(!req.user){

        return res.status(400).json({

            success:false,
            data:null,
            message:"user not found "

        })

    }
    else{

        const userExists = await User.findById(req.user._id);

        if(!userExists){

            return res.status(400).json({

                success:false,
                data:null,
                message:"this user id is not exists "
    
            })
        }
        else{

            return res.status(200).json({

                success:true,
                data:userExists,
                message:"user is successsfully login through token  "
    
            })
        }
    }
});


router.post("/logOut",Auth,logOut);


router.post("/resetPassword",resetPassword);

router.post("/forgotPassowrd",forgotPassword);



router.post("/updateUserProfile",Auth,updateUserProfile);

router.get("/getUserProfileDetails",getUserProfileDetails);


router.get("/getUserDetails",Auth,getUserDetails);



// ***********************************************************************************************************************************//


// *****************************************************Chat Related Route and controller  *********************************************************************///



const {

    findUser,
    accessChat,
    fetchChats,
    createGroupChat
    ,renameGroup
    ,addNewUserToGroup,
    createMessage

    } = require("../controller/ChatController.js");



router.get("/accessChat",Auth,accessChat);

router.get("/fetchChats",Auth,fetchChats);

router.post("/createGroupChat",Auth,createGroupChat);

router.post("/renameGroup",Auth,renameGroup);

router.post("/addNewUserToGroup",addNewUserToGroup);

router.post("/createMessage",Auth,createMessage);






// ***************************************************** Notification related route and controller  ******************************************************************//



const
    {

        createNotification,
        getAllNotification
    
    } = require("../controller/NotificationController.js");


router.post("/createNotification",Auth,createNotification);

router.get("/getAllNotification",Auth,getAllNotification);



// ******************************************************************************************************************************//





module.exports = router;










