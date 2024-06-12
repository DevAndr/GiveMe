'use client'

import React, {FC} from 'react';
import {useQuery} from "@tanstack/react-query";
import {fetchPosts} from "@/hooks/usePosts";

interface PostsProps {

}

const Posts: FC<PostsProps> = () => {
    const {isFetching, data, error} = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts
    })

    if (isFetching)
        return (<h2>Loading...</h2>)

    return (
        <div>
            {
                data.data.map(post => (<div>{post.title}</div>))
            }
        </div>
    );
}

export default Posts;