import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../../context";
import MyButton from "../button/MyButton";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    return (
        <div className="navbar">
            <MyButton onClick={() => {
                setIsAuth(false)
                localStorage.removeItem('auth')
            }}>Logout</MyButton>
            <div className="navbar__links">
                <NavLink to={'/Posts'}>Posts</NavLink>
                <NavLink to={'/about'}>About</NavLink>
            </div>
        </div>
    );
};

export default Navbar;