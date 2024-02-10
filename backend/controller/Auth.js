const Otp = require("../model/Otp");

const User = require("../model/User");

const bcrypt = require("bcrypt");

const otpGenerator = require("otp-generator");

const { sendMail } = require("../utils/MailSender");

const jwt = requi

// exports.randomOtp = ()=>{

//     return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

// }

exports.sendOtp = async (emailt) => {

    try {

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

        const mailResponse = await sendMail(email, " successfully sent verification otp ", otp);

        console.log("mail send successfully ", mailResponse);

        const createOtp = await Otp.create({

            email, otp

        });

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

exports.VerifyOtp = async (req, res) => {

    try {

        // fetch the data 

        const { otp, email } = req.body;


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

        if (!mostRecent) {



            return res.status(400).json({

                success: false,

                data: null,

                message: "otp is not valid "

            })


        }

        // verfify the otp 

        if (otp !== mostRecent.otp) {

            return res.status(400).json({

                success: false,
    
                data: null,
    
                message: "otp is not valid "
    
            })
            
            
        }
        
        const updateUser = await Otp.findOneAndUpdate({ email: email }, {

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

            return res.status(301).json({

                success: false,
                data: null,
                message: "this user is also exists you need to verify through otp "

            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createOtp = await this.sendOtp(email);



        const createUser = await User.create({

            name: name,
            email: email,
            password: hashedPassword,
            userImage: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`


        })



        return res.status(200).json({

            success: true,
            message: "user entry in DB Successfully "

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




// login the user 


exports.logIn = async(req,res)=>{

    try{

        const {emailOrUserName,password} = req.body;

        if(!emailOrUserName || !password){

            return res.status(400).json({

                success: false,
                data:null,
                message: "all fields are not fullfilled  ",
                
    
            })
        }

        const userExists = await User.find({

            $or:[{email:emailOrUserName},{name:emailOrUserName}]

        });

        if(!userExists){

            return res.status(400).json({

                success: false,
                data:null,
                message: "user is not valid   ",
                
    
            })

        }


        // check the user verified is true or not 

        if(userExists.isVerified === false){

            return res.status(400).json({

                success: false,
                data:null,
                message: "user is not verified plz verify your user   ",
                
    
            })

        }


        // check the pasword 

        

        if(!await bcrypt.compare(userExists.password,password)){
        
            return res.status(400).json({

                success: false,
                data:null,
                message: "password dosent macth ",
                
    
            })

        }

        // create token 

        const token = jw

        //send the cookie

        // send the mail 






    }

    catch(error){

        console.log(error);

            return res.status(400).json({

                success: false,
                data:null,
                message: "error while creating the sign up ",
                error:error.message

            })

    }
}