import React from 'react';
import classes from "./Loader.module.css";


const Loader = () => {
    return (
        <div className={classes.loader} style={{display: 'flex', justifyContent: 'center', marginTop: 30}}>
            <svg>
                <circle cx="50" cy="50" r="40" stroke="darkcyan" strokeDasharray="78.5 235.5" strokeWidth="3" fill="none"></circle>
                <circle cx="50" cy="50" r="30" stroke="dodgerblue" strokeDasharray="62.8 188.8" strokeWidth="3" fill="none"></circle>
            </svg>
        </div>
    );
};

export default Loader;