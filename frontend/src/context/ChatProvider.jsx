
import { createContext, useState } from "react";

import axios from "axios";

import AuthServices from "../services/AuthServices";

export const chatContext = createContext();

export default function ChatProvider ({children}){


    const [authData,setAuthData] = useState([]);

    const [chats,setChats] = useState();

    const [selectedChat,setSelectedChat] = useState();

    // async function verifyUser(){

    //     try{

    //         console.log("context api ke andar ");

    //         let response = await AuthServices.authTokenLogin();

    //         console.log("token result ",response);

    //         setAuthData([response]);

    //     }
    //     catch(error){

    //         console.log(error);

    //     }
    // }

    async function fetchAllUserChats(){

        try{

            

        }
        catch(error){

            console.log(error);

        }
    }

    const value = {

        authData,
        setAuthData,
        selectedChat,
        setSelectedChat,
        chats,
        setChats

    }

    return <chatContext.Provider value={value}>

        {children}

    </chatContext.Provider>

}










