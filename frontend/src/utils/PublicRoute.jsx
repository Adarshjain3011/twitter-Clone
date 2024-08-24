import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
    const userData = useSelector((state) => state.auth);

    const isAuthenticated = userData.isAuthenticated ;

    console.log("user data ",userData.data);

    // If the user is authenticated, redirect them to the homepage or another protected page
    if (isAuthenticated) {
        return <Navigate to="/homepage" replace />;
    }

    // If the user is not authenticated, render the children components
    return children;
};

export default PublicRoute;


