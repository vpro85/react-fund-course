import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    /*const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });*/

    useEffect(() => {
        fetchPostById(params.id);
    }, [])

    async function fetchPostById(id) {
        setIsLoading(true);
        const response = await PostService.getById(id);
        setPost(response.data);
        setIsLoading(false);
    }

    return (
        <div>
            <h1> Post Item Id page: {params.id} </h1>
            {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
        </div>
    );
};

export default PostIdPage;