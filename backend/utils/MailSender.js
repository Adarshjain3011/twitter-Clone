
const nodemailer = require("nodemailer");

require("dotenv").config();

exports.sendMail = async(email,title,body)=>{


    try{


        const createTransport = nodemailer.createTransport({
    
            host:process.env.MAIL_HOST,
            port:587,  // 465 is also a port number 
            auth:{
    
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS

            }
        })
    
        const result = await createTransport.sendMail({
    
            from:`${process.env.MAIL_USER}`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
            
        });
    
        console.log(result);
    
        return result;


    }
    catch(error){


        console.log(error);

        return error.message;

    }


}

