import React, { useContext } from "react";

import "./styles.css";
import { MyContext } from "../AppContext/contextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
    const {user, setUser} = useContext(MyContext)
    const goTo = useNavigate()
    const token = localStorage.getItem("token")
    const handleSignOut = () => {
      localStorage.removeItem("token");
      setUser(null)
      goTo("/login")
    }
    return (
      <div className="topbar">
        <nav className="toolbar"  id="top-bar">
          <Link className="hello-topbar" to={user ? `/users/${user._id}` : `/login`}>
            {user ? ` ${user?.first_name } ${user?.last_name }` : "Please log in to continue"}
          </Link>
          {token && 
          <div className="log-out">
            <FontAwesomeIcon icon={faSignOut} className="sign-out" onClick={handleSignOut}/>
          </div>}
        </nav>
      </div>
    );
}

export default TopBar;
