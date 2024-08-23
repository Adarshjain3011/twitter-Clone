import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import AuthServices from '../services/AuthService'; 
import { setUserData } from "../redux/slices/Auth";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await AuthServices.getUserAllDetails();
                dispatch(setUserData(response.data.data));
            } catch (error) {
                toast.error(error.message);
                toast.error("Token not found or invalid");
                navigate("/auth/auth-signup", { state: { from: location } });
            }
        }

        if (!isAuthenticated) {
            getUserData();
        }
    }, [dispatch, isAuthenticated, location, navigate]);

    // If authenticated, render the children, otherwise redirect to login
    
    if (!isAuthenticated) {

        return null; // You can show a loader here if necessary
    }

    return children;
};

export default ProtectedRoute;


