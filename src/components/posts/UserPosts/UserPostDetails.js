import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById} from "../../../managers/posts";
import "./myPosts.css";


export const UserSelectedPostDetails = () => {
    const { postId } = useParams();
    const [selectedPost, setSelectedPost] = useState([]);

    const getPostDetails = () => {
        getPostById({ postId }).then((UserSelectedPostDetails) => {
        setSelectedPost(UserSelectedPostDetails);
        });
    };

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
                <p>Publication date & Time: {selectedPost?.publication_date}</p>
                <p>Content: {selectedPost?.content}</p>
            </article>
        )}
        
        <div>
            <Link to={`/posts/${postId}/view-comments`}>
            <button>View Comments</button>
            </Link>
            <Link to={`/posts/${postId}/add-comment`}>
            <button>Add Comment</button>
            </Link>
        </div>
    </div>
);
}
