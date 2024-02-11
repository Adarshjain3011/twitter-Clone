
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.Auth = async(req,res,next)=>{

    try{

        const token = req.body.token || req.cookies.AccessToken || req.header("Authorization")?.replace("bearer ","");


        if(!token){

            //

            return res.status(400).json({

                success:false,
                data:null,
    
                message:"token not found ",
    
            })
        }

        const tokenData = jwt.verify(token,process.env.JWT_ACCESS_TOKEN);

        console.log(tokenData);

        if(!tokenData){

            return res.status(400).json({

                success:false,
                data:null,
                message:"this is not valid token ",
    
            })

        }


        req.user = tokenData;

        next();


    

    }
    catch(error){

        console.log(error);

        return res.status(400).json({

            success:false,
            data:null,

            message:"their is something error while accessing token",

            error:error.message
        })
    }
}





