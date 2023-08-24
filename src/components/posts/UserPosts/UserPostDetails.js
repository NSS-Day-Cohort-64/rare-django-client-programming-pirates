import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./myPosts.css";

export const UserSelectedPostDetails = () => {
    const { postId } = useParams();
    const [selectedPost, setSelectedPost] = useState([]);
    const [postComments, setPostComments ] = useState([]);

    const getPosts = () => {
        fetch(`http://localhost:8000/posts/${postId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
        })
            .then(response => response.json())
            .then((postArray) => {
                setSelectedPost([postArray]);
            })
    }

    const getComments = () => {
        fetch(`http://localhost:8000/comments?post=${postId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
        })
        .then(response => response.json())
        .then((commentArray) => {
            setPostComments(commentArray); 
        })
    }

    useEffect(() => {
        getPosts();
        getComments();
    }, []);

    return (
        <div>
            <h1>Post Details</h1>
            <ul>
                <article className="post-card">
                    {selectedPost.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>Author: <Link to={`/Profile/${post.user?.id}`}>{post.user?.first_name} {post.user?.last_name}</Link></p>
                            <p>Category: {post.category?.label}</p>
                            <p>Publication date: {post.publication_date}</p>
                            <p>Content: {post.content}</p>
                        </li>
                    ))}
                </article>
            </ul>
            <div>
                <h2>Comments:</h2>
                <ul>
                    {postComments.map(comment => (
                        <li key={comment.id}>{comment.content} by {comment.author}</li>
                    ))}
                </ul>
            </div>
            <button>
                <Link to={`/posts/${postId}/add-comment`}>Add Comment</Link>
            </button>
        </div>
    );
};
