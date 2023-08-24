import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./myPosts.css";

export const UserPostsList = () => {
    const [posts, setPosts] = useState([]);
    // const [users, setUsers] = useState([]); // filter to filter posts by user; not needed for now 
    // const [categories, setCategories] = useState([]); // filter to filter posts by category; not needed for now
    // const [selectedCategory, setSelectedCategory] = useState(null); // filter to filter posts by category; not needed for now
    // const [selectedUser, setSelectedUser] = useState(null); // filter to filter posts by user; not needed for now 
    // const [filteredPosts, setFilteredPosts] = useState([]); // filter to filter posts by category; not needed for now 

    const getPosts = () => {
        fetch(`http://localhost:8000/posts`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
            .then((response) => response.json())
            .then((postArray) => {
                setPosts(postArray);
                // setFilteredPosts(postArray);
            });
    };
    

    const getCategories = () => {
        fetch(`http://localhost:8000/categories`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
            // .then((response) => response.json())
            // .then((categoryArray) => {
            //     setCategories(categoryArray);
            // });
    };

    useEffect(() => {
        getPosts();
        getCategories();
    }, []);

    // filter to filter posts by category; not needed for now 
    // const handleCategoryChange = (event) => {
    //     const categoryId = parseInt(event.target.value, 10);
    //     setSelectedCategory(categoryId === 0 ? null : categoryId);
    // };
    
// filter to filter posts by user; not needed for now 
    // const handleUserChange = (event) => {
    //     const userId = parseInt(event.target.value, 10);
    //     setSelectedUser(userId === 0 ? null : userId);
    // };

    // useEffect(() => {
    //     let filteredPostsArray = [...posts];

    //     if (selectedCategory !== null) {
    //         filteredPostsArray = filteredPostsArray.filter(
    //             (post) => post.category_id === selectedCategory
    //         );
    //     }

    //     if (selectedUser !== null) {
    //         filteredPostsArray = filteredPostsArray.filter(
    //             (post) => post.user_id === selectedUser
    //         );
    //     }

    //     setFilteredPosts(filteredPostsArray);
    // }, [selectedCategory, selectedUser, posts]);

    return (
        <div className="container">
            <h1 className="your-post-header">All Posts</h1>
            {/* filter to filter posts by category; not needed for now */}
            {/* <div>
                <label htmlFor="categorySelect">Select Category:</label>
                <select
                    id="categorySelect"
                    onChange={handleCategoryChange}
                    value={selectedCategory || 0}
                >
                    <option value={0}>All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.label}
                        </option>
                    ))}
                </select>
            </div> */}
            {/* filter to filter posts by user; not needed for now */}
            {/* <div>
                <label htmlFor="userSelect">Select User:</label>
                <select
                    id="userSelect"
                    onChange={handleUserChange}
                    value={selectedUser || 0}
                >
                    <option value={0}>All Users</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>
            </div> */}
            <ul className="post-list">
                {posts.map((post, index) => (
                    <li
                        key={post.id}
                        className={`post-card ${index === 0 ? "first-post" : ""}`}
                    >
                        <Link to={`UserPostDetails/${post.id}`}>
                            <h3 className="post-title">{post.title}</h3>
                        </Link>
                        <p className="post-author">
                            <strong>Author:</strong> {post.author.full_name}{" "}
                        </p>
                        <p className="post-category">
                            <strong>Category:</strong> {post.category.label}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
