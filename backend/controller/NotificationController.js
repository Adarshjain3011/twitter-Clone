
const Notification = require("../model/NotificationSchema");


exports.createNotification = async (req, res) => {


    try {

        const senderId = req.user._id;

        const { recieverId, message } = req.body;

        if (!recieverId || !message) {


            return res.status(400).json({

                success: false,
                data: null,
                message: "all fields are not fullfilled ",

            })

        }


        // create new notfication

        const newNotification = await Notification.create({

            senderId: senderId,
            recieverId: recieverId,
            content: message,

        })


        // fetch new notfication 

        const createdNotification = await Notification.findById(newNotification._id).populate({

            path: "senderId",
            select: "name userImage email"

        }).populate({

            path: "recieverId",
            select: "name userImage email"

        })


        return res.status(200).json({

            success: true,
            data: createdNotification,
            message: "notification created successfully ",

        })



    }
    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "some error occur while creating notification ",

        })

    }
}






exports.getAllNotification = async (req, res) => {


    try {

        const userId = req.user._id;

        if (!userId) {


            return res.status(400).json({

                success: false,
                data: null,
                message: "all fields are not fullfilled ",

            })

        }

        // getting all notification 


        const userRelatedNotification = await Notification.find({

            recieverId:userId,

        }).populate({

            path: "senderId",
            select: "name userImage email"

        }).populate({

            path: "recieverId",
            select: "name userImage email"

        })


        return res.status(200).json({

            success: true,
            data: userRelatedNotification,
            message: "user related notfication are ",

        })



    }
    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "all fields are not fullfilled ",

        })

    }
}



