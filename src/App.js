import React, {useMemo, useState} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

function App() {

    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Front'},
        {id: 2, title: 'Python', body: 'Back'},
        {id: 3, title: 'Assembler', body: 'Base'},
    ])

    const [selectedSort, setSelectedSort] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const sortedPosts = useMemo(() => {
        // console.log("getSortedPost executed")
        if (selectedSort) {
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
        }
        return posts;
    }, [selectedSort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort);
        // setPosts(sortedPosts)
    }

    return (
        <div className="App">
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <div>
                <MyInput
                    placeholder={"Search..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue="Sort by"
                    options={[
                        {value: "title", name: "by title"},
                        {value: "body", name: "by description"},
                    ]}
                />
            </div>
            {sortedAndSearchedPosts.length ?
                <PostList posts={sortedAndSearchedPosts} title={"JS Posts list"} remove={removePost}/>
                :
                <h1 style={{textAlign: "center"}}>Page is empty</h1>
            }
        </div>
    );
}

export default App;
