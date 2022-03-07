import React, { useContext, useEffect, useState } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {

    let navigate = useNavigate();
    const [token, setToken] = useContext(UserContext);

    const userLinks = () =>
        <div className="d-flex flex-row">

            <Link style={{ marginTop: "25px", fontSize: '25px' }} className="col-md-auto nav-link active px-lg-4 rounded"
                to="/Home">Home</Link>
            <Link style={{ marginTop: "25px", fontSize: '25px' }} className="col-md-auto nav-link active px-lg-4 rounded"
                to="/Favs">Favs</Link>
            <a style={{ fontSize: '25px', marginTop: '20px' }} className="col-md-auto nav-link active px-lg-4 rounded" href="#" onClick={logout_user}>Logout</a>

        </div>


    const guestLinks = () => (
        <div className="d-flex flex-row">

            <Link style={{ marginTop: "25px", fontSize: '25px' }} className="col-md-auto nav-link active px-lg-4 rounded"
                to="/Login">Login</Link>
            <Link style={{ marginTop: "25px", fontSize: '25px' }} className="col-md-auto nav-link active px-lg-4 rounded"
                to="/Register">Register</Link>

        </div>
        
    );


    const logout_user = () => {
        setToken(null);

        return navigate("/Login");
    };

    return (

        <nav class="navbar navbar-light bg-light">
            
            {token ? userLinks() : guestLinks()}

        </nav>
    );
}


export default Navbar;
