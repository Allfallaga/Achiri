import React from 'react';
import AuthContext from '../../context/AuthProvider';
import { Navigate } from 'react-router-dom'


function Navbar(props) {

    const { auth, setAuth } = React.useContext(AuthContext)

    const logout = () => {
        if (auth.loggedIn === true) {
            setAuth({ loggedIn: false })
            localStorage.setItem('auth', "")
            props.socket.emit("disconnect")
            return <Navigate to="/" />
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand" href="#">Video Chat</a>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <button className="btn btn-secondary btn-lg" onClick={logout}>Logout</button>
                    </li>
                </ul>
            </div>
            <div>
            </div>
        </nav>
    );
}

export default Navbar;