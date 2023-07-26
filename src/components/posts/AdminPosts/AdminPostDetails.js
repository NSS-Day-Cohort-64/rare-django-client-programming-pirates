import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostDetails } from "../../../../APIManager";

export const AdminSelectedPostDetails = () => {
    const { postId } = useParams();
    const { selectedPost, setSelectedPost } = useState({});

    useEffect(() => {
        fetch(`http://localhost:8088/posts/${postId}?_expand=categories`)
        const  postDetails = getPostDetails()
        setSelectedPost(postDetails)
    }, [postId]);

    return (
        <div>
            <h1>Post Details</h1>
                <ul>
                <article className = "post">
                    {selectedPost.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>Author: {post.first_name} {post.last_name}</p>
                            <p>Category: {post.category}</p>
                            <p>Publication date: {post.publication_date}</p>
                            <p>Content: {post.content}</p>
                        </li>
                    ))}
                </article>
                </ul>
        </div>
    )
}