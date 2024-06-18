import axiosInstance from "@/lib/axiosInstance";
import {useQuery} from "@tanstack/react-query";

const fetchPosts = async () => {
    return await axiosInstance.get('https://jsonplaceholder.typicode.com/posts')
}

const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: () => fetchPosts()
    })
}

export {fetchPosts, usePosts}