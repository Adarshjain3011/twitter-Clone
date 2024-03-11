
const cloudinary = require("cloudinary").v2

require("dotenv").config();

exports.UploadImageToCloudinary = async (file, folder, height, quality) => {

    try {

        const options = { folder };

        options.height = height;

        options.quality = quality;

        options.resource_type = "auto";

        return await cloudinary.uploader.upload(file.tempFilePath, options);


    }

    catch (error) {

        console.log("cloudiary falied  ");

        console.log(error);

    }
}


// async function uploadFileToCloudinary(file, folder) {

//     const { options } = { folder };

//     console.log("options", options);

//     console.log("temp file path ", file.tempFilePath);

//     return await cloudinary.uploader.upload(file.tempFilePath, options);

// }






// exports.UploadMultipleImageToCloudinary = async (files, folder) => {

//     try {


//         const files = req.files['video'];

//         console.log("type of the file ");
//         console.log(typeof files);
//         console.log(" all the files at the backend ", files);

//         console.log("1");

//         console.log("file ki length 1 hai ", files.length);

//         // const supportedTypes = ["jpg", "jpeg", "png"];

//         const imageUrl = [];

//         console.log(typeof files);

//         for (const file of files) {

//             console.log("2");
//             console.log("each file at the backens side ", file)
//             const fileType = file.name.split(".")[1].toLowerCase();

//             console.log("3");

//             const response = await uploadFileToCloudinary(file, folder);
//             imageUrl.push(response.secure_url);
//             console.log("cloudinary upload successfull ", response);

//         }


//         // after uploading all the files tothe  cloudinary return the array of images 

//         console.log(imageUrl);

//         return imageUrl;


//     }

//     catch (error) {

//         return res.status(400).json({

//             status: false,

//             message: "their is something error while uploading file to cloudinary  as welll  ",
//             error: error.message,

//         })
//     }

// }










