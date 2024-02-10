const mongoose = require("mongoose");

const mailSender = require("../utils/MailSender");

const OtpSchema = new mongoose.Schema({

    email:{

        type:String

    },
    otp:{

        type:String,

    },

    createdAt:{

        type:Date,
        default:Date.now(),
        expiresIn:5*60

    },

},{timestamps:true});

// Define a function to send emails
// async function sendVerificationEmail(email, otp) {
    
//     // Define the email options
    
// 	// Create a transporter to send emails
// 	try {

//         // Send the email
// 		const mailResponse = await mailSender(
// 			email,
// 			"Verification Email",
// 			emailTemplate(otp)
// 		);
// 		console.log("Email sent successfully: ", mailResponse.response);

// 	} catch (error) {
// 		console.log("Error occurred while sending email: ", error);
// 		throw error;
// 	}
// }


// OtpSchema.pre("save",async function (next))

module.exports = mongoose.model("Otp",OtpSchema);

