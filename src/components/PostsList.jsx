import React from 'react';
import PostItem from "./PostItem/PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostsList = ({posts, title, remove}) => {
    if (!posts.length) {
        return(
            <div><h2 style={{textAlign: 'center'}}>Постов не найдено</h2></div>
        )
    }

    return (
        <div>
            <h1>{title}</h1>
            <TransitionGroup>
                {posts.map(post =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem post={post} remove={remove}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostsList;