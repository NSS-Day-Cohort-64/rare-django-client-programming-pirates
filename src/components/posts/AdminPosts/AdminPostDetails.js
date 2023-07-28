import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./myPosts.css";

export const AdminSelectedPostDetails = () => {
  const { postId } = useParams();
  const [selectedPost, setSelectedPost] = useState([]);

  const getPosts = () => {
    fetch(`http://localhost:8088/posts/${postId}`)
      .then((response) => response.json())
      .then((postArray) => {
        setSelectedPost([postArray]);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>Post Details</h1>
      <ul>
        <article className="post-card">
          {selectedPost.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>Author: {post.user?.first_name} {post.user?.last_name}</p>
              <p>Category: {post.category?.label}</p>
              <p>Publication date: {post.publication_date}</p>
              <p>Content: {post.content}</p>
            </li>
          ))}
        </article>
      </ul>
    </div>
  );
};