import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import axios from "axios";
import { MyContext } from "../AppContext/contextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  //const users = models.userListModel();
  const [users, setUsers] = useState([]);
  const [hideSidebar, setHideSidebar] = useState(false)
  const token = localStorage.getItem("token")
  const {user} = useContext(MyContext)
  useEffect(() => {
    const fetchUsers = async () => {
      const headers = { 'Authorization': `Bearer ${token}` };
      try {
        const res = await axios.get(
          "https://sqvfxf-8080.csb.app/api/user/list",
          {headers: headers}
        );
        setUsers(res.data);
        console.log("fetched users")
      } catch (e) {
        console.error("Error fetching user list:", e);
     
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className={`side-bar ${hideSidebar ? 'hide' : ''}`}>
      <div className="list-header">
        <h2 className={`list-header-text ${hideSidebar ? 'hide' : ''}`}>User List </h2>
        <div className="bar" onClick={() => setHideSidebar(!hideSidebar)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <nav className={`nav-bar ${hideSidebar ? 'hide' : ''}`}>
        <ul className="list">
          {users?.filter(item => item._id !== user._id).map((item) => (
            <li key={item._id} className="list-item">
              <Link className="link-item" to={`/users/${item._id}`}>
                {item.first_name + " " + item.last_name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default UserList;
