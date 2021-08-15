import React, {useEffect, useState} from "react";
import '../styles/App.css'
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {useFetching} from "../hooks/useFetching";

function Posts() {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pagesArray, setPagesArray] = useState([]);

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);


    const [fetchPosts, isPostsLoading,error] = useFetching(async()=>{
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        setTotalPages(getPageCount(response.headers['x-total-count'], limit));
    })


    useEffect(() => {
        fetchPosts()
    }, [page])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const changePage = (page) => {
        setPage(page);
    }

    return (
        <div className="App">
            <MyButton onClick={fetchPosts}>Get posts</MyButton>
            <MyButton style={{marginTop: "30px"}} onClick={() => setModal(true)}>Create modal</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <PostFilter filter={filter} setFilter={setFilter}/>
            {
                isPostsLoading
                    ? <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>
                    : <PostList posts={sortedAndSearchedPosts} title={"JS Posts list"} remove={removePost}/>
            }
            <Pagination
                pagesArray={pagesArray}
                page={page}
                changePage={changePage}
                totalPages={totalPages}
                setPagesArray={setPagesArray}
            />
        </div>
    );
}

export default Posts;
