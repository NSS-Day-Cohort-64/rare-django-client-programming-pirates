import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export const UserAddComment = () => {
  const [commentSubject, setCommentSubject] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();

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
                subject: commentSubject,
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
};

            setCommentContent("");
            setCommentSubject("");
            navigate(`/posts/UserPosts/UserAllPosts/UserPostDetails/${postId}`);
        } 
        finally {
            console.log("Comment Added");
        }
};

  return (
    <>
    <div>
    <h1>Add Comment</h1>
    <form onSubmit={handleCommentSubmit}>
        <div>
            <br />
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
                            <button type="submit">Add Comment</button>
                <Link to={`/posts/UserPosts/UserAllPosts/UserPostDetails/${postId}`}>Back to Post</Link>
        </div>
            </form>
        </div>
        </>
  )
}
