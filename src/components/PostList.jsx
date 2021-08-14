import React from 'react';
import PostItem from "./PostItem";

const PostList = ({posts, title, remove}) => {
    if (!posts.length){
        return(
            <h1 style={{textAlign: "center"}}>
                No posts found...
            </h1>
        )
    }
    return (
        <>
            <h1 style={{textAlign: "center"}}>
                {title}
            </h1>
            {posts.map((post, index) =>
                <PostItem remove={remove} number={index+1} key={post.id} post={post}/>)}
        </>
    );
};

export default PostList;