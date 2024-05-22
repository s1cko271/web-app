import './App.css';

import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from './components/LoginSignup/Login';
import SignUp from './components/LoginSignup/Signup';
import Home from './components/Home/Home';
import Photo from './components/UserPhotos/Photo';
import { MyContext } from './components/AppContext/contextProvider';
import axios from 'axios';
import NotFound from './components/NotFound/NotFound';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const {user, setUser} = useContext(MyContext)
  useEffect(() => {
    if(!token) return
    const fetchUserProfile = async () => {
        const headers = { 'Authorization': `Bearer ${token}` };
        if(!token) return;
        try{
            const res = await axios.get(
                "https://sqvfxf-8080.csb.app/api/admin/profile",
                {headers: headers}
                )
            setUser(res.data);
            console.log(res.data)
        }catch(e){
            console.error("Failed to fetch user profile", e);
        }
    }

    fetchUserProfile()
  }, [token])

  return (
      <Router>
        <div>
          <div className='app-container'>
            <div className='top-bar'>
              <TopBar />
            </div>
            <div className='main-topbar-buffer'></div>
            {user &&
              <UserList />
            }
            <div className='main-content-container'>
                <Routes>
                  <Route path='/' element={<Home />}/>
                  <Route 
                      path='/login'
                      element = {localStorage.getItem('token') ? <Navigate to="/" /> : <Login setToken={setToken}/>}
                  />
                  <Route path='/signup' element={<SignUp />}></Route>
                  <Route
                    path="/users/:userId"
                    element={token ? <UserDetail /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/photos/:userId"
                    element={token ? <UserPhotos /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/photo/:photoId"
                    element={token ? <Photo /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/users"
                    element={token ? <UserList /> : <Navigate to="/login" />}
                  />
                  <Route 
                    path='*'
                    element = {<NotFound />}
                  />
                </Routes>
            </div>
          </div>
        </div>
      </Router>
  );
}

export default App;
