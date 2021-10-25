import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";


const PostForm = ({create, formStyle}) => {
    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {...post, id: Date.now()}

        create(newPost)
        setPost({title: '', body: ''})
    }
    return (
        <form style={formStyle}>
            <span>Заголовок</span>
            <MyInput
                type="text"
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
            />
            <span>Текст</span>
            <MyInput
                type="text"
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
            />
            <MyButton onClick={addNewPost} style={{marginTop: '20px'}}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;