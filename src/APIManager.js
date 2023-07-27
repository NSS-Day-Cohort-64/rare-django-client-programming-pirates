import { useParams } from "react-router-dom";

export const getUser = async (id) => {
    const response = await fetch(`http://localhost:8088/users/${id}`);
    const users = await response.json();
    return users;
};

// Gets all posts
export const getAllPosts = () => {
    fetch(`http://localhost:8088/posts`)
    .then(response => response.json())
    .then(postsArray => {
    const sortedPosts = postsArray.sort((a, b) => {
    const dateA = new Date(a.publication_date);
    const dateB = new Date(b.publication_date);
    return dateB - dateA;
    })
    return sortedPosts
    })
    }
    
    
    // Gets selected post details
    export const GetPostDetails = () => {
    const { postId } = useParams();
    fetch(`http://localhost:8088/posts/${postId}?_expand=categories`)
    .then((response) => response.json())
    }
    