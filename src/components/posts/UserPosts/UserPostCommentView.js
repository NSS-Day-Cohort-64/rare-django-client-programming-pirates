import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export const UserPostCommentView = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [commentContent, setCommentContent] = useState("");
    const [postComments, setPostComments] = useState([]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("auth_token")}`,
                },
                body: JSON.stringify({
                    post: postId,
                    content: commentContent,
                }),
            });

            if (response.ok) {
                await response.json();
                fetch(`http://localhost:8000/posts/${postId}`, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("auth_token")}`,
                    },
                })

                    .then(response => response.json())
                    .then(postData => {
                        setPostComments(postData.comments);
                        navigate(`/posts/UserPosts/UserAllPosts/UserPostDetails/${postId}`);
                    });

                setCommentContent("");
            } else {
                console.error("Error adding comment");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:8000/posts/${postId}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
        })
            .then(response => response.json())
            .then(postData => setPostComments(postData.comments));
    }, []);


    return (
        <div>
            <h1>Add Comment</h1>
            <form onSubmit={handleCommentSubmit}>
                <div>
                    <label htmlFor="commentContent">Comment:</label>
                    <textarea
                        id="commentContent"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <h2>Comments:</h2>
                    <ul>
                        {postComments && postComments.map(comment => (
                            <li key={comment.id}>{comment.content}</li>
                        ))}
                    </ul>
                </div>

                <button type="submit">Add Comment</button>
                <Link to={`/posts/UserPosts/UserAllPosts/UserPostDetails/${postId}`}>Back to Post</Link>
            </form>
        </div>
    );
}
