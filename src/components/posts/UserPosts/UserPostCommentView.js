import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteComment } from "../../../APIManager";
import { getPostById } from "../../../managers/posts";

export const UserPostCommentView = () => {
    const { postId } = useParams();
    const [postComments, setPostComments] = useState([]);
    const [postTitle, setPostTitle] = useState("");

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
        getPostById({ postId }).then((post) => {
            setPostTitle(post.title);
        }
        );
    }, []);

    const handleDeleteComment = (commentId) => {
        const deleteWindow = window.confirm(
            "Are you sure you want to delete this comment?"
        );
        if (deleteWindow) {
            deleteComment(commentId).then(() => {
                setPostComments((prevComments) =>
                    prevComments.filter((comment) => comment.id !== commentId)
                );
            });
        }
    };

    return (
        <>
                <div>
                    <h1>Post Title: {postTitle}</h1>
                    <h2>Comments:</h2>
                    <ul className="comment-list">
                        {postComments?.map(comment => (
                            <li key={comment.id}>
                                <h3>{comment.subject}</h3>
                                {comment.content}
                                <h4>Author: {comment.author_username}</h4>
                                <h4>Creation Date: {new Date(comment.creation_date).toLocaleDateString()}</h4>
                                <button type="delete" onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>
                                <button type="edit">
                                <Link to={`/posts/${postId}/view-comments/EditCommentForm/${comment.id}`}>Edit Comment</Link>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <Link to={`/posts/${postId}/add-comment`}>
            <button>Add Comment</button>
            </Link>
                </div>
        </>
    );
}
