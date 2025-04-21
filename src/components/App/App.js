import io from 'socket.io-client'
import React, { useState, useEffect, useContext } from "react"
import Chatroom from '../Chatroom/Chatroom'
import Login from '../Login/Login'
import Rooms from '../Rooms/Rooms'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import RequiredAuth from '../Auth/RequiredAuth'

function App() {
  console.log(process.env.REACT_APP_SERVER_ADDR_COMP)
  const socket = io(process.env.REACT_APP_SERVER_ADDR_COMP, { 
    // secure: true,
    // transports: ['websocket'] 
  })

  const { auth, setAuth } = useContext(AuthContext)

  return (
    <Router>
      {/* {auth.loggedIn && <Navbar socket={socket} />} */}
      <div className="container-fluid">
        <div className="App">
          <Routes>
            <Route exact path="/" element={auth.loggedIn ? <Navigate to="/rooms" /> : <Login />} />
            {/* <Route exact path="/sfu" element={<Sfu />} /> */}
            <Route element={<RequiredAuth />}>
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/chatroom/:id" element={<Chatroom socket={socket}/>} />
            </Route>
          </Routes>
        </div >
      </div>
    </Router>
  );
}

export default App;