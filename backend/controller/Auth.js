
const Otp = require("../model/Otp");

const User = require("../model/User");

const bcrypt = require("bcrypt");

const otpGenerator = require("otp-generator");

const AdditionalDetails = require("../model/AdditionalDetails");


// const sendMail = require("../utils/MailSender");

const jwt = require("jsonwebtoken");

const cookie = require("cookie");

const { sendMail } = require("../utils/MailSender");


const options = {

    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
};



exports.sendOtp = async (email) => {

    try {

        const otp = otpGenerator.generate(5, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        const createOtp = await Otp.create({

            email: email,
            otp: otp

        });


        const mailResponse = await sendMail(email, "successfully sent verification otp ", otp);

        console.log("mail send successfully ", mailResponse);


        console.log("createOtp", createOtp);

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


exports.resendOtp = async (req, res) => {

    try {


        console.log("resend otp ke andar ");

        const { email } = req.body;

        console.log("email is ", email);
        const response = await this.sendOtp(email);

        console.log("response is ", response);


        if (response) {

            return res.status(200).json({

                success: true,
                data: null,
                message: "otp send successfully to the user email"

            })
        }

        else {

            return res.status(400).json({

                success: false,
                data: null,
                message: "error occur while sending otp to the user email"

            })

        }

    }

    catch (error) {

        return res.status(400).json({

            success: false,
            data: null,
            message: "error occur while sending otp to the user email"

        })


    }
}





exports.VerifyOtp = async (req, res) => {

    try {

        // fetch the data 

        const { otp, email } = req.body;

        console.log(otp, email);
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

        console.log("most recent", mostRecent);

        if (mostRecent.length === 0) {

            console.log("1");
            return res.status(400).json({

                success: false,

                data: null,

                message: "otp is not valid "

            })


        }

        // verfify the otp 

        console.log(otp, mostRecent[0].otp);

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
                message: "t user is already  exists you need to verify the user  "

            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);



        // sending an otp to the user 


        try {

            await this.sendOtp(createUser.email);

        }
        catch (error) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "error while while sending otp to the user  ",
                error: error.message

            })

        }


        const newAddtionalDetails = await AdditionalDetails.create({

            dob: "",
            gender: null,
            ContactNo: "",
            coverImage: "",
            bio: "",
            city: "",
            additionalLink: "",
            ContactNo: "",
            coverImage: "",

        })


        // create a new user 

        const createUser = await User.create({

            name: name,
            email: email,
            password: hashedPassword,
            userImage: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,

            addtionalDetails: newAddtionalDetails._id,


        })

        return res.status(200).json({

            success: true,
            data: createUser,
            message: "user entry in DB Successfully ",

        })


    }

    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "error while creating the sign up ",
            error: error.message

        })
    }
}



const generateRefreshAndAccessToken = async (userId) => {



    try {

        // validate 

        if (!userId) {

            return false;
        }


        const userExists = await User.findById(userId);


        if (!userExists) {

            return false;

        }

        const accessToken = userExists.generateAccessToken();

        const refreshToken = userExists.generateRefreshToken();

        userExists.refreshToken = refreshToken;

        await userExists.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };


    }

    catch (error) {

        console.log(error);

        return false;

    }
}


// login the user 

exports.logIn = async (req, res) => {
    try {
        const { emailOrUserName, password } = req.body;

        if (!emailOrUserName || !password) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "All fields are required",
            });
        }

        // Look up the user by email or username
        const userData = await User.findOne({
            $or: [{ email: emailOrUserName }, { name: emailOrUserName }]
        });

        if (!userData) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "Invalid user credentials",
            });
        }

        // Check if the user is verified
        if (!userData.isVerified) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "User is not verified. Please verify your account.",
            });
        }

        // Check if the password matches
        const isPasswordMatch = await bcrypt.compare(password, userData.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "Incorrect password",
            });
        }

        // Generate tokens
        const { refreshToken, accessToken } = await generateRefreshAndAccessToken(userData._id);

        // Exclude sensitive fields before sending the user data
        const loggedInUser = await User.findById(userData._id).select("-refreshToken -password");

        // Set cookie options
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true only in production
            credentials: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        };

        // Return success response with cookies
        return res
            .status(200)
            .cookie("AccessToken", accessToken, cookieOptions)
            .cookie("RefreshToken", refreshToken, cookieOptions)
            .json({
                success: true,
                data: loggedInUser.email,
                message: "User logged in successfully",
            });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            data: null,
            message: "Error during login",
            error: error.message,
        });
    }
};





// logout condition W


exports.logOut = async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "User ID not found.",
            });
        }

        const findUser = await User.findByIdAndUpdate(userId, {
            accessToken: undefined,
            refreshToken: undefined,
        }, { new: true });

        if (!findUser) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "User not found.",
            });
        }

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ensure secure cookies in production
            sameSite: "Strict",
            // Add any other cookie options here if necessary
        };

        return res.status(200)
            .clearCookie("AccessToken", cookieOptions)
            .clearCookie("RefreshToken", cookieOptions)
            .json({
                success: true,
                data: findUser,
                message: "User logged out successfully.",
            });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            data: null,
            message: "Error while logging out.",
            error: error.message,
        });
    }
};





// forgot password


exports.resetPassword = async (req, res) => {

    try {


        // ftech th data 

        const userId = req.user._id;

        const { oldPassword, currentPassword, confirmPassword } = req.body;


        // validate the data 


        if (!userId || !currentPassword || !oldPassword || !confirmPassword) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "user id not found  ",

            })

        }

        // find the user 

        const userDetails = await User.findById(userId);

        // compare the old and existing password 

        const checkPassword = await bcrypt.compare(currentPassword, userDetails.password);

        if (checkPassword) {

            // compare currentPassword and  confirmPassword 

            if (currentPassword !== confirmPassword) {

                return res.status(400).json({

                    success: false,
                    data: null,
                    message: " password  currentPassword and confirmPassword does not match",

                })
            }


            // hash the new password 

            const hashPassword = await bcrypt.hash(currentPassword, 10);

            userDetails.password = hashPassword;


            // update the user details 

            await userDetails.save();

            // successfully send the mail to the user 

            await sendMail(email, "password reset successfully ");


            return res.status(200).json({

                success: true,
                data: userDetails,
                message: " password reset  successfully",

            })

        }

        else {


            return res.status(400).json({

                success: false,
                data: null,
                message: " password  currentPassword and oldPassword does not match",

            })


        }

    }

    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "error reset the password  ",
            error: error.message

        })

    }
}





exports.forgotPassword = async (req, res) => {

    try {

        // fetch the data 

        const { currentPassword, confirmPassword, email } = req.body;


        // validate the data 


        if (!email || !currentPassword || !confirmPassword) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "all fileds are  not found  ",

            })

        }

        // find the user 

        const userDetails = await User.findOne({ email: email });


        // compare currentPassword and  confirmPassword 

        if (currentPassword !== confirmPassword) {

            return res.status(400).json({

                success: false,
                data: null,
                message: " password  currentPassword and confirmPassword does not match",

            })
        }


        // hash the new password 

        const hashPassword = await bcrypt.hash(currentPassword, 10);

        userDetails.password = hashPassword;


        // update the user details 

        await userDetails.save();

        // successfully send the mail to the user 

        await sendMail(email, "password change successfully ");


        return res.status(200).json({

            success: true,
            data: userDetails,
            message: " password reset  successfully",

        })



    }

    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "error reset the password  ",
            error: error.message

        })

    }
}




