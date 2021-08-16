import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";

const Login = () => {
    const {setAuth, setIsAuth} = useContext(AuthContext)

    const login = (e) => {
        e.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
    }

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={login}>
                <MyInput type={"text"} placeholder={"Input login..."}></MyInput>
                <MyInput type={"password"} placeholder={"Input password..."}></MyInput>
                <MyButton>Login</MyButton>
            </form>
        </div>
    );
};

export default Login;