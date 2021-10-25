import React, {forwardRef} from 'react';
import classes from "./PostItem.module.css";
import MyButton from "../UI/button/MyButton";
import {useHistory} from "react-router-dom";

const PostItem = (props) => {
    const router = useHistory()

    return (
        <div className={classes.post}>
            <div className={classes.post__content}>
                <h3 className={classes.post__title}>{props.post.title}</h3>
                <p className={classes.post__description}>{props.post.body}</p>
            </div>
            <MyButton onClick={() => router.push(`/posts/${props.post.id}`)}>Открыть</MyButton>
            <MyButton color='red' onClick={() => props.remove(props.post)}>Удалить</MyButton>
        </div>
    );
};

export default PostItem;
