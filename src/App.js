import React, {useState} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

function App() {

    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Description'},
        {id: 2, title: 'Javascript 2', body: 'Description'},
        {id: 3, title: 'Javascript 3', body: 'Description'},
    ])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    return (
        <div className="App">
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <div>
                <MySelect
                    defaultValue="Sort by"
                    options={[
                        {value: "title", name: "by title"},
                        {value: "body", name: "by description"},
                    ]}
                />
            </div>
            {posts.length !== 0 ?
                <PostList posts={posts} title={"JS Posts list"} remove={removePost}/>
                :
                <h1 style={{textAlign: "center"}}>Page is empty</h1>
            }
        </div>
    );
}

export default App;
