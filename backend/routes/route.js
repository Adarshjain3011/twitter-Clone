const express = require("express");

const router = express.Router();

const {
    
        signUp,
        logIn,
        sendOtp,
        VerifyOtp,
        logOut,
        resetPassword,
        forgotPassword


    } = require("../controller/Auth");

const {

    Auth

    } = require("../middleware/auth");


router.post("/signup",signUp);

router.post("/verifyOtp",VerifyOtp);

router.post("/login",logIn);

router.post("/sendOtp",async(req,res)=>{

    await sendOtp(req.body.email);

});

router.post("/logOut",Auth,logOut);


router.post("/resetPassword",resetPassword);

router.post("/forgotPassowrd",forgotPassword);


module.exports = router;






