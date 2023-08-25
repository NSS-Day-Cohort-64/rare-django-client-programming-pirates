import { useState, useEffect } from "react";
import "./myPosts.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import { getUserPost, postDelete } from "../../../managers/posts";

export const UserMyPosts = ({ token }) => {
  const [posts, updatePosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    getUserPost({ token }).then((posts) => 
      updatePosts(posts)
    );
  }, [token]);

  const deleteHandler = (postId) => {
    const deleteWindow = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (deleteWindow) {
      postDelete({ postId }).then(() => {
        updatePosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== postId)
        );
      });
    }
  };

  return (
    <div className="my-posts-container">
      <h2 className="your-post-header">Your Posts</h2>
      {posts.map((post) => (
        <div className="post-card" key={post.id}>
          <Link to={`UserPostDetails/${post.id}`}>
            <h3 className="post-title">{post.title}</h3>
          </Link>
          <p className="post-publication-date"> {post.publication_date}</p>
          <p className="post-content">{post.content}</p>
          {post.image_url && (
            <img
              className="post-image"
              src={post.image_url}
              alt="Post Image"
            />
          )}
          <p className="post-author">
            Author: {post?.user?.first_name} {post?.user?.last_name}
          </p>
          <p className="post-category">Category: {post.category.label}</p>
          <button onClick={() => navigate(`/posts/UserPosts/UserEditPost/${post.id}`)}> Edit </button>
          <button onClick={() => deleteHandler(post.id)}> Delete </button>
        </div>
      ))}
    </div>
  );
};