import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const AdminPostsList = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        fetch(`http://localhost:8088/posts`)
            .then(response => response.json())
            .then((postArray) => {
                setPosts(postArray)
            })
    }

    useEffect(() => {
        getPosts()
    }, []);

    return (
        <div>
            <h1>All Posts</h1>
            <ul className="post-list">
                <article className="post">
                    {posts.map((post) => (
                        <li key={post.id} className="post-box">
                            <Link to={`AdminPostDetails/${post.id}`}>
                                <h3>{post.title}</h3>
                            </Link>
                            <p>Author: {post.user.first_name} {post.user.last_name}</p>
                            <p>Category: {post.category.label}</p>
                        </li>
                    ))}
                </article>
            </ul>
        </div>
    );
};
