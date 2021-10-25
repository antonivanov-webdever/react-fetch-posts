import React, {useContext} from 'react';
import classes from "./Navbar.module.css";
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className={classes.navbar}>
            <nav className={classes.navigation}>
                <Link to="/" className={classes.navigation__link}>Home</Link>
                <Link to="/about" className={classes.navigation__link}>About</Link>
                <Link to="/posts" className={classes.navigation__link}>Posts</Link>
            </nav>
            <div>
                <MyButton color={'white'} onClick={logout}>
                    Выйти
                </MyButton>
            </div>
        </div>
    );
};

export default Navbar;