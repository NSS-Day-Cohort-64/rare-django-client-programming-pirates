import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./myPosts.css";

export const AdminPostsList = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    fetch(`http://localhost:8088/posts`)
      .then((response) => response.json())
      .then((postArray) => {
        setPosts(postArray);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="post-container"> 
      <h1 className="your-post-header">All Posts</h1>
      {posts.map((post) => (
        <article key={post.id} className="post-card">
          <Link to={`AdminPostDetails/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>Author: {post.user.first_name} {post.user.last_name}</p>
          <p>Category: {post.category.label}</p>
        </article>
      ))}
    </div>
  );
};
