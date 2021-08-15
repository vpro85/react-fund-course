import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar__links">
                <NavLink to={'/Posts'}>Posts</NavLink>
                <NavLink to={'/about'}>About</NavLink>
            </div>
        </div>
    );
};

export default Navbar;