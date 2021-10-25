import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostsService from "../API/PostsService";
import Loader from "../components/UI/Loader/Loader";

const Post = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([])
    const [fetchPost, isPostLoading, postError] = useFetching(async (id) => {
        const response = await PostsService.getPostById(id)
        setPost(response.data)
    })
    const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostsService.getPostComments(id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPost(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div>
            <h1>Страница поста с id = {params.id}</h1>
            <div>
                {isPostLoading
                    ? <Loader/>
                    : <div>
                        <div>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </div>
                    </div>
                }
            </div>
            <div style={{marginTop: 30}}>
                <h2>Комментарии</h2>
                <ul>
                    {isCommentsLoading
                        ? <Loader/>
                        : comments.map(comm =>
                            <li key={comm.id} style={{marginTop: 20}}>
                                <h4>{comm.email}</h4>
                                <p>{comm.body}</p>
                            </li>
                        )


                    }
                </ul>
            </div>
        </div>
    );
};

export default Post;