import React, {useEffect, useRef, useState} from "react";
import PostsList from "./../components/PostsList";
import PostForm from "./../components/PostForm";
import PostFilter from "./../components/PostFilter";
import MyModal from "./../components/UI/MyModal/MyModal";
import MyButton from "./../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostsService from "./../API/PostsService";
import Loader from "./../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPagesCount} from "../utils/pages";
import Pagination from "./../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modalVisibility, setModalVisibility] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostsService.getAll(limit, page)
        const totalCount = response.headers['x-total-count']

        setPosts([...posts, ...response.data])
        setTotalPages(getPagesCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1)
    })


    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModalVisibility(false)
    }

    const removePost = (removablePost) => {
        setPosts(posts.filter(post => post.id !== removablePost.id))
    }

    const changePage = (newPage) => {
        setPage(newPage)
        fetchPosts(limit, page)
    }

    return (
        <div className="App">
            <div className="container">
                <MyButton style={{marginTop: '30px'}} onClick={() => setModalVisibility(true)}>
                    Создать пост
                </MyButton>
                <hr style={{margin: '15px 0', backgroundColor: 'blue'}}/>
                <PostFilter
                    filter={filter}
                    setFilter={setFilter}
                />
                <MySelect
                    value={limit}
                    onChange={value => {setLimit(value)}}
                    defaultValue="Кол-во элементов на странице"
                    options={[
                        {value: 5, name: '5'},
                        {value: 10, name: '10'},
                        {value: 15, name: '15'},
                        {value: -1, name: 'Показать все'}
                    ]}
                />
                { postError && <h2 style={{textAlign: 'center', marginTop: 30}}>Произошла ошибка ${postError}</h2> }
                <PostsList title={"Список постов"} posts={sortedAndSearchedPosts} remove={removePost}/>
                <div ref={lastElement} style={{height: 20, background: 'red'}}></div>
                { isPostLoading && <Loader /> }
                <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    changePage={changePage}
                />
                <MyModal visible={modalVisibility} setVisible={setModalVisibility}>
                    <h2>Создание поста</h2>
                    <PostForm create={createPost} formStyle={{marginTop: '20px'}}/>
                </MyModal>
            </div>
        </div>
    );
}

export default Posts;
