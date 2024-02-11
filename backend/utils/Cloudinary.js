
const cloudinary = require("cloudinary").v2

require("dotenv").config();

exports.UploadImageToCloudinary = async(file,folder,height,quality)=>{

    try{

        const options = {folder};

        options.height = height;

        options.quality = quality;

        options.resource_type = "auto";

        return await cloudinary.uploader.upload(file.tempFilePath ,options);


    }   

    catch(error){

        console.log("cloudiary falied  ");

        console.log(error);

    }
}


