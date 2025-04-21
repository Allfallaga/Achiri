import React from 'react';
import AuthContext from '../../context/AuthProvider'
import { Route, Navigate, Outlet } from 'react-router-dom'


function RequiredAuth(props) {

    const { auth } = React.useContext(AuthContext)

    if (!auth.loggedIn) {
        return <Navigate to="/" />
    }
    return <Outlet/>

}

export default RequiredAuth;