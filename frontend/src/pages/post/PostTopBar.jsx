import { useState } from "react";

const PostTopBar = () => {
    const [currentState, setCurrentState] = useState("for you");

    return (
        <div className="bg-black w-[37%] flex border border-gray-700 h-16 justify-center items-center fixed top-0 z-10">
            <div className="flex relative w-full cursor-pointer">
                <div
                    className={`flex flex-col justify-center items-center text-white font-bold w-[50%] hover:bg-white/10 h-16 transition-all duration-700 ${currentState === "for you" ? "bg-white/10" : ""
                        }`}
                    onClick={() => setCurrentState("for you")}
                >
                    <p className={`${currentState !== "following" ? "text-white" : "text-zinc-600"}`}>For You</p>

                    {currentState === "for you" && (
                        <div className="absolute w-[60px] h-1 bg-indigo-600 bottom-0 rounded-full transition-transform duration-300 transform">
                            {/* Empty space */}
                        </div>
                    )}
                </div>

                <div
                    className={`flex flex-col justify-center items-center font-bold w-[50%] hover:bg-white/10 h-16 transition-all duration-700 ${currentState === "following" ? "bg-white/10 " : ""
                        }`}
                    onClick={() => setCurrentState("following")}
                >
                    <p className={`${currentState == "following" ? "text-white" : "text-zinc-600"}`}>following</p>

                    {currentState === "following" && (
                        <div className="absolute w-[60px] h-1 bg-indigo-600 bottom-0 rounded-full transition-transform duration-700 transform">
                            {/* Empty space */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostTopBar;


