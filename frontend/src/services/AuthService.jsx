
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


// **********************************************************************************************************************//

// router.get("/accessChat",Auth,accessChat);

// router.get("/fetchChats",Auth,fetchChats);

// router.post("/createGroupChat",Auth,createGroupChat);

// router.post("/renameGroup",Auth,renameGroup);

// router.post("/addNewUserToGroup",addNewUserToGroup);




const findUser = async(data)=>{

    return await jsonData.get(`/findUser?search=${data}`);
    
}



const accessChat = async(userId)=>{


    return await jsonData.get(`/accessChat?userId=${userId}`);



}



const fetchChats = async(data)=>{

    return await jsonData.get(`/fetchChats?anotherUserId=${data}`);

}

const createGroupChat = async(data)=>{


    return await jsonData.post("/createGroupChat")

}


const renameGroup = async(data)=>{

    return await jsonData.post("/renameGroup")

}


const addNewUserToGroup = async(data)=>{

    return await jsonData.post("/addNewUserToGroup");

}



const createMessage = async(data)=>{

    return await jsonData.post("/createMessage",data);

}

const checkUserOnline = async(userId)=>{

    return await jsonData.get(`/${userId}/online`);

}




const createNewNotification = async(data)=>{


    //recieverId, message

    return await jsonData.post("/createNotification",data);

}


const getUserAllNotifications = async()=>{


    return await jsonData.get("/getAllNotification");


}


const getUserAllDetails = async()=>{


    return await jsonData.get("/getUserDetails");


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
    getUserProfileDetails,
    getUserAllDetails,



    accessChat,
    fetchChats,
    createGroupChat,
    findUser,
    renameGroup,
    addNewUserToGroup,
    createMessage,
    checkUserOnline,
    getUserAllNotifications,



}


export default AuthServices;




