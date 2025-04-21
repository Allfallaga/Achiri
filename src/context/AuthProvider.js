import React, { createContext, useState } from "react"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

    let initialAuthState = {}

    if (localStorage.getItem('auth')) {
        initialAuthState = JSON.parse(localStorage.getItem('auth'))
    }

    const [auth, setAuth] = useState(initialAuthState)

    return <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext