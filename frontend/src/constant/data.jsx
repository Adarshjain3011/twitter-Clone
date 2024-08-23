import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { TbSquareForbid } from "react-icons/tb";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

export const useSideFeatures = () => {
    const navigate = useNavigate();

    return [
        { title: "Home", icon: <MdHomeFilled />, onClick: () => navigate("/") },
        { title: "Explore", icon: <FiSearch /> },
        { title: "Notifications", icon: <IoNotifications />, onClick: () => navigate("/notifications") },
        { title: "Messages", icon: <IoMailOutline />, onClick: () => navigate("/messages") },
        { title: "Grok", icon: <TbSquareForbid /> },
        { title: "List", icon: <MdHomeFilled /> },
        { title: "Communities", icon: <FiUsers /> },
        { title: "Profile", icon: <FaRegUser />, onClick: () => navigate("/profile") },
        { title: "More", icon: <TbDotsCircleHorizontal /> }
    ];
};


