import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const EditCommentForm = ({ comment }) => {
    const [commentSubject, setCommentSubject] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const { postId, commentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (comment) {
            setCommentSubject(comment.subject);
            setCommentContent(comment.content);
        }
    }, [comment]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/comments/${commentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("auth_token")}`,
                },
                body: JSON.stringify({
                    post: postId,
                    subject: commentSubject,
                    content: commentContent,
                }),
            });

            if (response.ok) {
                response.json();
                navigate(`/posts/UserPosts/UserAllPosts/UserPostDetails/${postId}`);
            } else {
                console.error("Error updating comment");
            }
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    return (
        <div>
            <h1>Edit Comment:</h1>
            <form onSubmit={handleCommentSubmit}>
                <div>
                    <label>Subject:</label>
                    <textarea
                        id="commentSubject"
                        value={commentSubject}
                        onChange={(e) => setCommentSubject(e.target.value)}
                        required
                    />
                    <br />
                    <label>Content:</label>
                    <textarea
                        id="commentContent"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        required
                    />
                    <br />
                    <button type="submit">Save Comment</button>
                    <Link to={`/posts/UserPosts/UserAllPosts/UserPostDetails/${postId}`}>Back to Post</Link>
                </div>
            </form>
        </div>
    );
};