import React, {useRef, useState} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

function App() {

    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Description'},
        {id: 2, title: 'Javascript 2', body: 'Description'},
        {id: 3, title: 'Javascript 3', body: 'Description'},
    ])

    const [post, setPost] = useState({title:'', body:''})

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            id: Date.now(),
            title,
            body
        }
        setPosts([...posts, {...post, id:Date.now()}]);
        setPost({title:'', body:''})
    }

    return (
        <div className="App">
            <form>
                <MyInput
                    value={post.title}
                    onChange={e => setPost({...post, title: e.target.value})}
                    type={"text"}
                    placeholder={"Post name"}
                />
                <MyInput
                    value={post.body}
                    onChange={e => setPost({...post, body: e.target.value})}
                    type="text"
                    placeholder={"Description"}
                />
                <MyButton onClick={addNewPost}>Create Post</MyButton>

            </form>
            <PostList posts={posts} title={"JS Posts list"}/>
        </div>
    );
}

export default App;
