import io from 'socket.io-client';
import React, { useContext, useMemo } from "react";
import Chatroom from '../Chatroom/Chatroom';
import Login from '../Login/Login';
import Rooms from '../Rooms/Rooms';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import RequiredAuth from '../Auth/RequiredAuth';
// import Navbar from '../Navbar/Navbar'; // Décommente si tu ajoutes une barre de navigation

function App() {
  const { auth } = useContext(AuthContext);

  // Utilisation de useMemo pour éviter de recréer le socket à chaque rendu
  const socket = useMemo(() => io(process.env.REACT_APP_SERVER_ADDR_COMP), []);

  return (
    <Router>
      {/* {auth.loggedIn && <Navbar socket={socket} />} */}
      <div className="container-fluid">
        <main className="App" role="main">
          <Routes>
            <Route
              path="/"
              element={auth.loggedIn ? <Navigate to="/rooms" replace /> : <Login />}
            />
            <Route element={<RequiredAuth />}>
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/chatroom/:id" element={<Chatroom socket={socket} />} />
            </Route>
            {/* Ajoute ici d'autres routes si besoin */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;