
const Chat = require("../model/ChatModel");

const User = require("../model/User");

const Message = require("../model/MessageModel");



exports.accessChat = async (req, res) => {

    try {


        console.log(req.query.userId)

        let userId = req.query.userId;

        console.log("user id is ", userId);


        if (!userId) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "some error occur  while creating chatting ",

            })

        }


        // find the chat bw the user 


        console.log(req.user._id);

        var isChat = await Chat.findOne({

            isGroupChat: false,
            $and: [

                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]

        }).populate("users", "-password")  // Populates the 'users' field, excluding the 'password' field
            .populate({

                path: 'latestMessage',

                populate: {

                    path: 'Sender',
                    select: '-password'
                }

            });    // Exclude the 'password' field from the populated 'Sender' field


        // if that chat bw the user exists then we simply return that chat 


        console.log("chat bw user ", isChat);

        if (isChat) {

            return res.status(200).json({

                success: true,
                data: null,
                message: "successfully find the chat bw the users  ",

            })

        }

        else {

            // if chat not found then create new chat bw two users 

            let createdNewChat = await Chat.create({

                chatName: "Sender",
                isGroupChat: false,
                users: [req.user._id, userId],


            })


            console.log("created new ")


            const fullChat = await Chat.findOne({ _id: createdNewChat._id }).populate("users", "-password");

            console.log(fullChat);



            return res.status(200).json({

                success: true,
                data: fullChat,
                message: "successfully establish chat bw the user  ",

            })

        }

    }
    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "some error occur  while creating chatting ",

        })
    }
}









exports.fetchChats = async (req, res) => {


    try {


        // let userId = req.user._id;

        let anotherUserId = req.query.anotherUserId;

        // console.log(req.user._id);

        console.log("another user id", anotherUserId);

        if (!anotherUserId) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "user id is not found ",

            })

        }



        const findChats = await Chat.
            findOne({

                isGroupChat: false,
                $and: [

                    { users: { $elemMatch: { $eq: req.user._id } } },
                    { users: { $elemMatch: { $eq: anotherUserId } } }

                ]

            }).sort({ updatedAt: -1 }).populate("latestMessage");


        if (!findChats) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "current user has no chats with anyone  ",

            })
        }

        return res.status(200).json({

            success: true,
            data: findChats,
            message: "current user all chats ",

        })

    }
    catch (error) {


        console.log(error);


        return res.status(400).json({

            success: false,
            data: null,
            message: "some error occur  while fetching the current user chats for the other user ",

        })

    }
}








exports.createMessage = async (req, res) => {


    try {

        const { messageContent, recieverId } = req.body;

        if (!messageContent || !recieverId) {


            return res.status(400).json({


                success: false,
                data: null,
                message: "plz fill alll the fields "

            })

        }

        let senderId = req.user._id;


        // find the chat id bw the user 

        var isChat = await Chat.findOne({

            isGroupChat: false,
            $and: [

                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: recieverId } } }
            ]

        }).populate("users", "-password")  // Populates the 'users' field, excluding the 'password' field



        // check this chat exist bw the user or not 

        if (!isChat) {


            return res.status(400).json({


                success: false,
                data: null,
                message: "this chat id is not exists  "

            })


        }




        // create a new message 

        let newMessage = await Message.create({

            Sender: senderId,
            content: messageContent,
            chat: isChat._id,

        })


        // find the chat by using chatId and update the newly created  message 


        let updatedChat = await Chat.findByIdAndUpdate(isChat._id, {

            $push: {

                latestMessage: newMessage._id

            }

        }, { new: true }).populate({

            path: "latestMessage",
            populate: {

                path: "Sender",
                select: "name email userImage"

            }

        });


        let newMessageFinder = await Message.findById(newMessage._id);

        return res.status(200).json({

            success: true,
            data: newMessageFinder,
            message: "sucessfullly created the message  "

        })



    }
    catch (error) {


        console.log(error);

        return res.status(400).json({


            success: false,
            data: null,
            message: "plz fill alll the fields "

        })


    }
}









exports.createGroupChat = async (req, res) => {


    try {


        if (!req.body.users || !req.body.name) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "plz fills all the fields ",

            })

        }



        // at the fronetnd side we send it in the Stringify format and at the backend we have parse all the user 

        var users = JSON.parse(req.body.users);

        if (users.length < 2) {

            return res.status(400).json({

                success: false,
                data: null,
                message: "more than two people are required to form the group ",

            })

        }

        users.push(req.user._id);

        let newGroupFormed = await Chat.create({

            chatName: req.body.name,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user.id,

        })


        // fetch this group chat 

        let newGroupChat = await Chat.findOne({ _id: newGroupFormed._id }).populate("users", "-password").populate("groupAdmin", "-password");

        return res.status(200).json({

            success: true,
            data: newGroupChat,
            message: "new group chat is formed successfully ",

        })

    }
    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,
            data: null,
            message: "some error occcur while creating the group chat  ",

        })

    }
}





exports.renameGroup = async (req, res) => {

    try {

        const { chatName, chatId } = req.body;

        console.log(chatName, chatId);

        if (!chatName || !chatId) {


            return res.status(400).json({

                success: false,
                data: null,
                message: "plz fills all the fields ",

            })

        }

        const updatedChatName = await Chat.findByIdAndUpdate(chatId, {

            chatName: chatName,

        }, { new: true });


        if (!updatedChatName) {


            return res.status(400).json({

                success: false,
                data: null,
                message: "no chat is find with this chat id ",

            })

        }


        return res.status(200).json({

            success: true,

            data: updatedChatName,

            message: "chatname is updated successfully ",

        })


    }
    catch (error) {


        console.log(error);

        return res.status(400).json({

            success: false,

            data: null,

            message: "some error occur while upadting chat name  ", error

        })

    }
}







// add new user to the group 


exports.addNewUserToGroup = async (req, res) => {


    try {

        const { chatId, userId } = req.body;

        console.log(chatId, chatId);

        if (!userId || !chatId) {


            return res.status(400).json({

                success: false,
                data: null,
                message: "plz fills all the fields ",

            })

        }


        // check this new user is already in the group or not 

        // if it is present rhen  remove it otherwise add to the group 

        let userAlreadyExists = await Chat.findOne({ _id: chatId, users: { $in: [userId] } });


        console.log("is user already exists ", userAlreadyExists);

        let newGroupMemberData;

        if (userAlreadyExists) {

            newGroupMemberData = await Chat.findByIdAndUpdate(chatId, {

                $pull: {

                    users: userId

                }

            }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password").sort({ updatedAt: -1 });

            return res.status(200).json({

                success: true,

                data: newGroupMemberData,

                message: "the given userid remove to this group  successfully ",

            })



        }
        else {

            newGroupMemberData = await Chat.findByIdAndUpdate(chatId, {

                $push: {

                    users: userId

                }

            }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password").sort({ updatedAt: -1 });


            return res.status(200).json({

                success: true,

                data: newGroupMemberData,

                message: "the given userid added to this group  successfully ",

            })

        }


    }
    catch (error) {

        console.log(error);

        return res.status(400).json({

            success: false,

            data: null,

            message: "errror occur while adding  new memeber to this chat group",

        })
    }
}










