import React from "react";

import { useState } from "react";

import { CiSettings } from "react-icons/ci";

const CreatePostTopBar = () => {

    const [currentState, setCurrentState] = useState("for you");

    return (

        <div className="bg-black flex border border-white/15 h-16 justify-center items-center fixed top-0 z-10 w-[530px] left-[31%]">

            <div className="flex w-[90%] relative">

                <div
                    className="flex flex-col justify-center items-center text-white font-bold trans w-[50%] hover:bg-white/10 h-16 "
                    onClick={() => setCurrentState("for you")}
                >
                    <button className="outline-none border-none">For you</button>

                    {currentState == "for you" && (
                        <div className="absolute w-[60px] h-1 bg-indigo-600 bottom-0 rounded-full">
                            {" "}
                        </div>
                    )}
                </div>

                <div
                    className="flex flex-col justify-center relative  items-center text-white font-bold w-[50%] hover:bg-white/10 h-16"
                    onClick={() => setCurrentState("following")}
                >
                    <button className="outline-none border-none">Following</button>

                    {currentState == "following" && (
                        <div className="absolute w-[60px] h-1 bg-indigo-600 bottom-0 rounded-full">
                            {" "}
                        </div>
                    )}
                </div>
            </div>

            <div className="w-[10%] flex h-9 justify-center items-center text-white rounded-full hover:bg-white/10">
                <CiSettings></CiSettings>

                
            </div>
        </div>
    );
};

export default CreatePostTopBar;




