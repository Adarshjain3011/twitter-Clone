
const Otp = require("../model/Otp");

const User = require("../model/User");

const bcrypt = require("bcrypt");

const otpGenerator = require("otp-generator");

const AdditionalDetails = require("../model/AdditionalDetails");


// const sendMail = require("../utils/MailSender");

const jwt = require("jsonwebtoken");

const cookie = require("cookie");

const { sendMail } = require("../utils/MailSender");


exports.sendOtp = async (email) => {

    try {

        const otp = otpGenerator.generate(5, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false });

        const createOtp = await Otp.create({

            email:email,
             otp:otp

        });


        const mailResponse = await sendMail(email, "successfully sent verification otp ", otp);

        console.log("mail send successfully ", mailResponse);


        console.log("createOtp",createOtp);

        if (createOtp) {

            return true;
        }


        return false;


    }

    catch (error) {


        console.log(error);

        return false


    }


}


exports.resendOtp = async(req,res)=>{

    try{


        console.log("resend otp ke andar ");

        const {email} = req.body ;

        console.log("email is ",email);
        const response = await this.sendOtp(email);

        console.log("response is ",response);


        if(response){

            return res.status(200).json({

                success:true,
                data:null,
                message:"otp send successfully to the user email"

            })
        }

        else{

            return res.status(400).json({

                success:false,
                data:null,
                message:"error occur while sending otp to the user email"

            })
            
        }

    }

    catch(error){

        return res.status(400).json({

            success:false,
            data:null,
            message:"error occur while sending otp to the user email"

        })
        

    }
}





exports.VerifyOtp = async (req, res) => {

    try {

        // fetch the data 

        const { otp, email } = req.body;

        console.log(otp,email);
        // validate the data 

        if (!otp || !email) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "all fields are not fullfilled ",

            })

        }

        // find most recent otp 

        const mostRecent = await Otp.find({ email: email }).sort({ createdAt: -1 }).limit(1);

        console.log("most recent",mostRecent);

        if (mostRecent.length === 0) {

            console.log("1");
            return res.status(400).json({

                success: false,

                data: null,

                message: "otp is not valid "

            })


        }

        // verfify the otp 

        console.log(otp,mostRecent[0].otp);

        if (otp !== mostRecent[0].otp) {

            console.log("1.1");
            return res.status(400).json({

                success: false,
    
                data: null,
    
                message: "otp is not valid "
    
            })
            
            
        }
        
        const updateUser = await User.findOneAndUpdate({ email: email }, {

            isVerified: true

        }, { new: true });
        
        return res.status(200).json({

            success: true,

            data: updateUser,

            message: "otp verfy successfully"

        })


    }

    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,

            data: null,
            message: "their is something error while verifying the otp ",

        })

    }
}





exports.signUp = async (req, res) => {

    try {

        // fetch the data 

        const { name, email, password } = req.body;

        console.log(req.body);

        if (!name || !email || !password) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "error while creating the sign up "
            })

        }


        const userExists = await User.findOne({ email: email });

        if (userExists && userExists.isVerified === true) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "this email is already exists  "

            })



        }

        if (userExists && userExists.isVerified === false) {

            await this.sendOtp(email);

            return res.status(301).json({

                success: false,
                data: null,
                message: "this user is also exists you need to verify through otp "

            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // const createOtp = await this.sendOtp(email);

        // create the additional detaisl fields 

        const newAddtionalDetails = await AdditionalDetails.create({

            dob:"",
            gender:null,
            ContactNo:"",
            coverImage:"",
            bio:"",
            city:"",
            additionalLink:"",
            ContactNo:"",
            coverImage:"",

        })



        const createUser = await User.create({

            name: name,
            email: email,
            password: hashedPassword,
            userImage: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
            
            addtionalDetails:newAddtionalDetails._id,


        })


        await this.sendOtp(createUser.email);

        return res.status(200).json({

            success: true,
            data:createUser,
            message: "user entry in DB Successfully ",
            
        })


    }

    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data:null,
            message: "error while creating the sign up ",
            error:error.message

        })
    }
}



// const options = {

//     httpOnly:true,
//     secure:true,
//     expiresIn:new Date()+24*60*60*1000,

// }



const generateRefreshAndAccessToken = async(userId)=>{



    try{

        // validate 

        if(!userId){

            return false;
        }


        const userExists = await User.findById(userId);


        if(!userExists){

            return false;

        }

        const accessToken = userExists.generateAccessToken();

        const refreshToken = userExists.generateRefreshToken();

        userExists.refreshToken = refreshToken;

        await userExists.save({validateBeforeSave:false});

        return { accessToken,refreshToken };


    }

    catch(error){

        console.log(error);

        return false;
        
    }
}


// login the user 


exports.logIn = async(req,res)=>{

    try{

        // const {emailOrUserName,password} = req.body;

        const emailOrUserName = req.body.email;
        const password = req.body.password;

        console.log(emailOrUserName,password);


        if(!emailOrUserName || !password){

            return res.status(410).json({

                success: false,
                data:null,
                message: "all fields are not fullfilled  ",
                
    
            })
        }

        const userExists = await User.find({

            $or:[{email:emailOrUserName},{name:emailOrUserName}]

        });

        console.log("userExists",userExists);

        if(!userExists){

            return res.status(400).json({

                success: false,
                data:null,
                message: "user is not valid   ",
                
    
            })

        }


        // check the user verified is true or not 

        console.log("hellow1");
        
        console.log(userExists.isVerified);

        if( userExists[0].isVerified !== true){

            await this.sendOtp(userExists.email);

            return res.status(410).json({

                success: false,
                data:null,
                message: "user is not verified plz verify your user   ",
                
    
            })

        }

        console.log("hellow 2");
        // check the pasword 


        console.log(userExists);

        console.log(password);

        // const checkPassword = await bcrypt.compare(password,userExists.password);

        const checkPassword = await bcrypt.compare(password,userExists[0].password);

        console.log("hellow3");

        if(checkPassword === false){
            
            console.log("password not match");
            return res.status(400).json({

                success: false,
                data:null,
                message: "password dosent macth ",
                
    
            })

        }

        // create token 

        const {refreshToken,accessToken} = await generateRefreshAndAccessToken(userExists[0]._id);

        console.log(userExists._id);
        const loggedInUser = await User.findOne({ _id:userExists[0]._id }).select("-refreshToken -password");

        //send the cookie

        console.log("logged user ",loggedInUser);

        const options = {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            Credential:true,
            expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours

          };


        return res
        .status(200)
        .cookie("AccessToken", accessToken, options)
        .cookie("RefreshToken", refreshToken, options)
        .json({
          success: true,
          data: { refreshToken, accessToken, loggedInUser },
          message: "User logged in successfully",

        });
  
        

        // send the ma
    }

    catch(error){

        console.log(error);

            return res.status(400).json({

                success: false,
                data:null,
                message: "error while creating the sign up ",
                error:error.message,

            })
    }
}




// logout condition 


exports.logOut = async(req,res)=>{

    try{

        const userId = req.user._id;

        if(!userId){

            return res.status(400).json({

                success: false,
                data:null,
                message: "user id not found  ",
                
            })

        }

        const findUser = await User.findByIdAndUpdate(userId,{

            refreshToken:undefined,

        },{new:true});

        return res.status(201).clearCookie("AccessToken",options).clearCookie("RefreshToken",options).json({

            success:true,
            data:findUser,
            message:"user logout successfully ",

        })


    }

    catch(error){
        
        console.log(error);

        return res.status(400).json({

            success: false,
            data:null,
            message: "error while log out ",
            error:error.message

        })

    }
}




// forgot password


exports.resetPassword = async(req,res)=>{

    try{


        // ftech th data 

        const userId = req.user._id;

        const {oldPassword,currentPassword,confirmPassword} = req.body;


        // validate the data 


        if(!userId || !currentPassword || !oldPassword || !confirmPassword){

            return res.status(400).json({

                success: false,
                data:null,
                message: "user id not found  ",
                
            })

        }   

        // find the user 

        const userDetails = await User.findById(userId);

        // compare the old and existing password 

        const checkPassword = await bcrypt.compare(currentPassword,userDetails.password);

        if(checkPassword){

            // compare currentPassword and  confirmPassword 

            if(currentPassword !== confirmPassword){

                return res.status(400).json({

                    success: false,
                    data:null,
                    message: " password  currentPassword and confirmPassword does not match",
                    
                })
            }


            // hash the new password 

            const hashPassword = await bcrypt.hash(currentPassword,10);

            userDetails.password = hashPassword;


            // update the user details 

            await userDetails.save();

            // successfully send the mail to the user 

            await sendMail(email,"password reset successfully ");
            

            return res.status(200).json({

                success: true,
                data:userDetails,
                message: " password reset  successfully",
                
            })

        }

        else{

            
            return res.status(400).json({

                success: false,
                data:null,
                message: " password  currentPassword and oldPassword does not match",
                
            })


        }

    }

    catch(error){

        console.log(error);

        return res.status(400).json({

            success: false,
            data:null,
            message: "error reset the password  ",
            error:error.message

        })

    }
}





exports.forgotPassword = async(req,res)=>{

    try{

        // fetch the data 

        const {currentPassword,confirmPassword,email} = req.body;


        // validate the data 


        if(!email || !currentPassword || !confirmPassword){

            return res.status(400).json({

                success: false,
                data:null,
                message: "all fileds are  not found  ",
                
            })

        }   

        // find the user 

        const userDetails = await User.findOne({email:email});


            // compare currentPassword and  confirmPassword 

            if(currentPassword !== confirmPassword){

                return res.status(400).json({

                    success: false,
                    data:null,
                    message: " password  currentPassword and confirmPassword does not match",
                    
                })
            }


            // hash the new password 

            const hashPassword = await bcrypt.hash(currentPassword,10);

            userDetails.password = hashPassword;


            // update the user details 

            await userDetails.save();

            // successfully send the mail to the user 

            await sendMail(email,"password change successfully ");
            

            return res.status(200).json({

                success: true,
                data:userDetails,
                message: " password reset  successfully",
                
            })



    }

    catch(error){

        console.log(error);

        return res.status(400).json({

            success: false,
            data:null,
            message: "error reset the password  ",
            error:error.message

        })

    }
}


