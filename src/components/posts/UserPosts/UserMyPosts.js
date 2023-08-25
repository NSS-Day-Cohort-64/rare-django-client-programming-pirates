import { useState, useEffect } from "react";
import "./myPosts.css";
import { useNavigate, Link } from "react-router-dom";
import { getUserPost } from "../../../managers/posts";

export const UserMyPosts = ({ token }) => {
  const [posts, updatePosts] = useState([]);
  const [modalsVisible, setModalsVisible] = useState({
    deleteModalVisible: false,
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate()


  useEffect(() => {
    getUserPost({ token }).then((posts) => 
    updatePosts(posts))
  }, [token]);

  return (
    <div className="my-posts-container">
      <h2 className="your-post-header">Your Posts</h2>
      {posts.map((post) => {

          return (
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
              <p className="post-author">Author!: {post?.user?.first_name} {post?.user?.last_name}</p>
              <p className="post-category">Category: {post.category.label}</p>
              <button onClick={() => navigate(`/posts/UserPosts/UserEditPost/${post.id}`)}> Edit </button>
            </div>
          );
      })}

      {modalsVisible.deleteModalVisible && selectedPost && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Confirm Delete</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() =>
                  setModalsVisible({
                    ...modalsVisible,
                    deleteModalVisible: false,
                  })
                }
              ></button>
            </header>
            <section className="modal-card-body">
              <p>Are you sure you want to delete "{selectedPost.title}"?</p>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button"
                onClick={() =>
                  setModalsVisible({
                    ...modalsVisible,
                    deleteModalVisible: false,
                  })
                }
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};