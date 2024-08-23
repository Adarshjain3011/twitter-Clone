import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom";

import { UserData } from '@/redux/slices/Auth';

const ProtectedRoute = ({ children }) => {

    const dispatch = useDispatch();

    const state = useSelector((state) => state);

    useEffect(()=>{

        async function getUserData() {
    
            await dispatch(UserData).then((response) => {
    
                console.log(state);
    
                if (state.auth.isError === 410) {
    
                    console.log(state.auth.isError);
    
                    toast.warning("plz verify your email ");
    
                    navigate("/auth/auth-signup", { replace: true });
    
    
                }
    
                else if (state.auth.isError === 400) {
    
                    toast.error("passoword dosent match ");
    
                }
                else {
    
    
                    navigate("/homepage");
    
                }
    
    
            })
        }

        getUserData();

    },[]);

    const user = useSelector((state) => state.user);
    let location = useLocation();

    if (!user.state.isAuthenticated) {
        return <Navigate to="/auth/auth-login" state={{ from: location }} replace />
    }
    return children

};

export default ProtectedRoute;



