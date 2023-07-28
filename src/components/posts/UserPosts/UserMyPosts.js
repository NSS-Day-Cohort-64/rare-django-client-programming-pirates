import { useState, useEffect } from "react";
import "./myPosts.css";
import { useNavigate } from "react-router-dom";

export const UserMyPosts = () => {
  const [posts, updatePosts] = useState([]);
  const [postReactions, updatePostReactions] = useState([]);
  const [modalsVisible, setModalsVisible] = useState({
    deleteModalVisible: false,
  });
  const [selectedPost, setSelectedPost] = useState(null);

  const rareUserId = localStorage.getItem("auth_token");
  const rareUser = JSON.parse(rareUserId);
  const navigate = useNavigate()

  const fetchedPosts = () => {
    fetch(`http://localhost:8088/posts`)
      .then((response) => response.json())
      .then((postData) => {
        updatePosts(postData);
      });
  };

  useEffect(() => {
    fetchedPosts();
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/post_reactions`)
      .then((response) => response.json())
      .then((postReactionData) => {
        updatePostReactions(postReactionData);
      });
  }, []);

  const handleConfirmDelete = (post) => {
    setSelectedPost(post);
    setModalsVisible({ ...modalsVisible, deleteModalVisible: true });
  };

  const handleDelete = () => {
    fetch(`http://localhost:8088/posts/${selectedPost.id}`, {
      method: "DELETE",
    }).then(() => {
      fetchedPosts();
    });
    console.log("Deleting post:", selectedPost);
    setModalsVisible({ ...modalsVisible, deleteModalVisible: false });
  };

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
              <p className="post-author">Author: {post.user.first_name} {post.user.last_name}</p>
              <p className="post-reaction-count">
                Reactions: {reactionCount.length}
              </p>
              <p className="post-category">Category: {post.category.label}</p>
              <button onClick={() => navigate(`/posts/UserPosts/UserEditPost/${post.id}`)}> Edit </button>
              <button onClick={() => handleConfirmDelete(post)}>
                {" "}
                Delete{" "}
              </button>
            </div>
          );
        }
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
              <button className="button is-danger" onClick={handleDelete}>
                Confirm Delete
              </button>
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
