import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../../../APIManager";

export const UserPostsList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const allPosts = getAllPosts()
        setPosts(allPosts)
    }, []);

    return (
        <div>
            <h1>All Posts</h1>
                <ul>
                <article className = "post">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Link to={`posts/UserPosts/UserPostDetails/${post.id}`}>
                                <h3>{post.title}</h3>
                            </Link>
                            <p>Author: {post.first_name} {post.last_name}</p>
                            <p>Category: {post.category}</p>
                        </li>
                    ))}
                </article>
                </ul>
        </div>
    );
};
