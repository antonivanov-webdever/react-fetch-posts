import React from 'react';
import classes from "./MyButton.module.css";

const MyButton = ({children, color,...props}) => {
    const rootClasses = (color) => {
        if (color === 'red') {
            return [classes.myBtn, classes.red].join(' ')
        }

        if (color === 'white') {
            return [classes.myBtn, classes.white].join(' ')
        }
        return classes.myBtn
    }
    return (
        <button className={rootClasses(color)} {...props}>
            { children }
        </button>
    );
};

export default MyButton;