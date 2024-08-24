import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthServices from '../services/AuthService';
import { setUserData, setError, startLoading } from '../redux/slices/Auth';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            dispatch(startLoading());

            try {
                if (!isAuthenticated) {
                    const response = await AuthServices.getUserAllDetails();

                    console.log("data from protected route ",response.data.data);
                    dispatch(setUserData(response.data.data));
                }
            } catch (error) {
                dispatch(setError(error.message || "Token not found"));
                navigate("/auth/auth-signup");
            }
        };

        getUserData();
    }, [isAuthenticated, dispatch, navigate]);

    return isAuthenticated ? children : <Navigate to="/auth/auth-signup" />;
};

export default ProtectedRoute;


