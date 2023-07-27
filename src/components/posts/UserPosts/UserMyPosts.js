/*import { useState, useEffect } from "react";

export const MyPosts = () => {
  const [posts, updatePosts] = useState([]);
  const [postReactions, updatePostReactions] = useState([]);

  const rareUserId = localStorage.getItem("auth_token");
  const rareUser = JSON.parse(rareUserId);

  useEffect(() => {
    fetch(`http://localhost:8088/posts`)
      .then((response) => response.json())
      .then((postData) => {
        updatePosts(postData);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/post_reactions`)
      .then((response) => response.json())
      .then((postReactionData) => {
        updatePostReactions(postReactionData);
      });
  }, []);

  return (
    <>
      <h2 className="tip-header">Your Posts</h2>
      {posts.map((post) => {
        if (post.user_id === rareUser) {
          const reactionCount = postReactions.filter(
            (pr) => pr.post_id === post.id
          );
          return (
            <div className="post-card">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-publication-date"> {post.publication_date}</p>
              <p className="post-content">{post.content}</p>
              {post.image_url && (
                <img
                  className="post-image"
                  src={post.image_url}
                  alt="Post Image"
                />
              )}
              <p className="post-author">Author: {post.user_id}</p>
              <p className="post-reaction-count">
                {" "}
                Reactions: {reactionCount.length}
              </p>
              <p className="post-category">Category: {post.category.label}</p>
            </div>
          );
        }
      })}
    </>
  );
};
*/
import { useState, useEffect } from "react";
import "./myPosts.css";

export const MyPosts = () => {
  const [posts, updatePosts] = useState([]);
  const [postReactions, updatePostReactions] = useState([]);

  const rareUserId = localStorage.getItem("auth_token");
  const rareUser = JSON.parse(rareUserId);

  useEffect(() => {
    fetch(`http://localhost:8088/posts`)
      .then((response) => response.json())
      .then((postData) => {
        updatePosts(postData);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/post_reactions`)
      .then((response) => response.json())
      .then((postReactionData) => {
        updatePostReactions(postReactionData);
      });
  }, []);

  return (
    <div className="my-posts-container">
      <h2 className="your-post-header">Your Posts</h2>
      {posts.map((post) => {
        if (post.user_id === rareUser) {
          const reactionCount = postReactions.filter(
            (pr) => pr.post_id === post.id
          );
          return (
            <div className="post-card" key={post.id}>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-publication-date"> {post.publication_date}</p>
              <p className="post-content">{post.content}</p>
              {post.image_url && (
                <img
                  className="post-image"
                  src={post.image_url}
                  alt="Post Image"
                />
              )}
              <p className="post-author">Author: {post.user_id}</p>
              <p className="post-reaction-count">
                Reactions: {reactionCount.length}
              </p>
              <p className="post-category">Category: {post.category.label}</p>
            </div>
          );
        }
      })}
    </div>
  );
};
