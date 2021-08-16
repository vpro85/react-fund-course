import React, {useEffect, useRef, useState} from "react";
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
import {useFetching} from "../hooks/useFetching";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pagesArray, setPagesArray] = useState([]);
    const lastElement = useRef();

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);


    const [fetchPosts, isPostsLoading, error] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        setTotalPages(getPageCount(response.headers['x-total-count'], limit));
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts(limit,page)
    }, [page,limit])

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
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue={"Number of elements on page"}
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Show all'},
                ]}
            />

            <PostList posts={sortedAndSearchedPosts} title={"JS Posts list"} remove={removePost}/>
            <div ref={lastElement} style={{height: '20px'}}></div>
            {isPostsLoading &&
            <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>
            }
            {/*<Pagination
                pagesArray={pagesArray}
                page={page}
                changePage={changePage}
                totalPages={totalPages}
                setPagesArray={setPagesArray}
            />*/}
        </div>
    );
}

export default Posts;
