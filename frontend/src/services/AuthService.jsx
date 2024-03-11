
import { jsonData,fileUploadData } from "./HttpCommon";



const authSignup = async(data)=>{

    return await jsonData.post("/signup",data);


}

const authLogin = async(data)=>{

    return await jsonData.post("/login",data);


}

const authVerifyOtp = async(data)=>{

    return await jsonData.post("/verifyOtp",data);

}

const authSendOtp = async(data)=>{

    return await jsonData.post("/sendOtp",{email:data});
    
}

const authResendOtp = async(data)=>{

    console.log(data);

    return await jsonData.post("/resendOtp",{email:data});
    

}

const authLogout = async(data)=>{

    return await jsonData.post("/logOut",data);
    
}

const authResetPassword = async(data)=>{

    return await jsonData.post("/resetPassword",data);
    
}


const authForgotPassword = async(data)=>{

    return await jsonData.post("/forgotPassowrd",data);
    
}


const authTokenLogin = async()=>{

    return await jsonData.get("/authToken");

}


const updateUserProfile = async(data)=>{

    console.log("data is ",data);

    return await fileUploadData.post("/updateUserProfile",data);

}

const userLogout = async()=>{

    return jsonData.post("/logOut");

}

const getUserProfileDetails = async(userName)=>{

    console.log("gste user ke adnadardata ",userName);

    return jsonData.get(`/getUserProfileDetails?userName=${userName}`);

}

const AuthServices = {

    authSignup,
    authLogin,
    authVerifyOtp,
    authSendOtp,
    authLogout,
    authResetPassword,
    authForgotPassword,
    authResendOtp,
    authTokenLogin,
    updateUserProfile,
    userLogout,
    getUserProfileDetails

}


export default AuthServices;


