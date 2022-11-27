import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Blog from './components/Blog';
import Insert from './components/webUser/Insert'
import './style/display.css'
import './style/navbar.css'


import { useState } from "react";


import logo from "./img/logo192.png"
import Display from './components/webUser/Display';

function SPA() {
    const listAllUsers = process.env.REACT_APP_API_URL + "/api/listAllUsers";

    // object for insert user
    const [userData, setUserData] = useState(
        {
            // "webUserId": "",
            "userEmail": "tamperrr_email@gmail.com",
            "userPassword": "passwordhere",
            "userPassword2": "passwordhere",
            "image": "image.jpg",
            "birthday": "09/29/2000",
            "membershipFee": "500.00",
            "userRoleId": "3",
        });

    // insert user tamper (with object above)
    const objToStr = new URLSearchParams(userData).toString();
    const insertUser = `${process.env.REACT_APP_API_URL}/api/insertUser?${objToStr}`;

    // object for insert user
    const [updateUserData, setUpdateUserData] = useState(
        {
            "webUserId": "514",
            "userEmail": "charlie@gmail.com",
            "userPassword": "asdf123f",
            "userPassword2": "asdf123f",
            "image": "https://cdn.britannica.com/73/101873-050-D341E939/Bob-Marley-1978.jpg",
            "birthday": "09/29/2000",
            "membershipFee": "100.66",
            "userRoleId": "2",
        });

    // insert user tamper (with object above)
    const objToStrUpdate = new URLSearchParams(updateUserData).toString();
    const updateUser = `${process.env.REACT_APP_API_URL}/api/updateUser?${objToStrUpdate}`;
    return (
        <div class="App">
            <div class="nav">
                <img src={logo} alt="Logo" height="50" width="50" />
                <div class="links">
                    <Link class="link" to="/">HOME</Link>
                    <Link class="link" to="blog">BLOG</Link>
                    <Link class="link" to="users">USERS</Link>
                    <Link class="link" to="insert">INSERT</Link>

                    {/* dropdown menu, per W3 schools */}
                    <div class="dropdown">
                        <button class="dropbtn">WebUserAPIs</button>
                        <div class="dropdown-content">
                            <a target="blank" href={listAllUsers}>ListAllUsers</a>
                            <a target="blank" href={insertUser}>InsertUser</a>
                            <a target="blank" href={updateUser}>UpdateUser</a>
                            {/* brad delete url tamper here, similar to above ^ */}
                        </div>
                    </div>


                </div>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="blog" element={<Blog />} />
                <Route path="users" element={<Display />} />
                <Route path="insert" element={<Insert />} />
            </Routes>
        </div>
    );
}

export default SPA;