import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { clearUserData } from '@/redux/slices/Auth';

import { useDispatch } from 'react-redux';

const PublicRoute = ({ children }) => {

    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth);

    const isAuthenticated = userData.isAuthenticated ;

    console.log("user data ",isAuthenticated);

    // dispatch(clearUserData());

    // If the user is authenticated, redirect them to the homepage or another protected page
    if (isAuthenticated) {
        return <Navigate to="/homepage" replace />;
    }

    // If the user is not authenticated, render the children components
    return children;
};

export default PublicRoute;


