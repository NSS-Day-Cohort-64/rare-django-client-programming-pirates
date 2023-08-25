import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById} from "../../../managers/posts";
import "./myPosts.css";

export const UserSelectedPostDetails = () => {
    const { postId } = useParams();
    const [selectedPost, setSelectedPost] = useState([]);
    const [postComments, setPostComments ] = useState([]);

    const getPostDetails = () => {
        getPostById({ postId }).then((UserSelectedPostDetails) => {
        setSelectedPost(UserSelectedPostDetails);
        });
    };

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
        getComments();
    }, []);

useEffect(() => {
    if (postId) {
    getPostDetails();
    }
}, [postId]);

return (
    <div>
        <h1>Post Details:</h1>
        {selectedPost && (
            <article className="post-card">
                <h3>{selectedPost.title}</h3>
                <p>
                    Author:{" "}
                    <Link to={`/Profile/${selectedPost.user?.id}`}>
                        {selectedPost?.author?.full_name}
                    </Link>
                </p>
                <p>Category: {selectedPost?.category?.label}</p>
                <p>Publication date: {selectedPost?.publication_date}</p>
                <p>Content: {selectedPost?.content}</p>
            </article>
        )}
        <div>
            <h2>Comments:</h2>
            <ul>
                {postComments.map(comment => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
        </div>
        <button>
            <Link to={`/posts/${postId}/add-comment`}>Add Comment</Link>
        </button>
    </div>
);
}