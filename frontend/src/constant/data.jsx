import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoNotifications, IoMailOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { TbSquareForbid, TbDotsCircleHorizontal } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';


export const useSideFeatures = () => {

    
    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth.data);
    
    console.log("auth data at hompage", authData);

    const navigate = useNavigate();

    return [
        { title: "Home", icon: <MdHomeFilled />, onClick: () => navigate("/") },
        { title: "Explore", icon: <FiSearch /> },
        { title: "Notifications", icon: <IoNotifications />, onClick: () => navigate("/notifications") },
        { title: "Messages", icon: <IoMailOutline />, onClick: () => navigate("/messages") },
        { title: "Grok", icon: <TbSquareForbid /> },
        { title: "List", icon: <MdHomeFilled /> },
        { title: "Communities", icon: <FiUsers /> },
        { title: "Profile", icon: <FaRegUser />, onClick: () => navigate(`/profile/${authData.name}`) }, // Replace 'your-profile-name' with the actual profile name
        { title: "More", icon: <TbDotsCircleHorizontal /> }
    ];
};

