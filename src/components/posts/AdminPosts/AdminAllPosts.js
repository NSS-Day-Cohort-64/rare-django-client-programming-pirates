import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AdminPostsList = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const getPosts = () => {
        fetch(`http://localhost:8088/posts`)
            .then((response) => response.json())
            .then((postArray) => {
                setPosts(postArray);
                setFilteredPosts(postArray);
            });
    };

    const getCategories = () => {
        fetch(`http://localhost:8088/categories`)
            .then((response) => response.json())
            .then((categoryArray) => {
                setCategories(categoryArray);
            });
    };

    useEffect(() => {
        getPosts();
        getCategories();
    }, []);

    const handleCategoryChange = (event) => {
        const categoryId = parseInt(event.target.value, 10);
        setSelectedCategory(categoryId);
        if (categoryId === 0) {
            setFilteredPosts(posts);
        } else {
            const filteredPostsByCategory = posts.filter(
                (post) => post.category_id === categoryId
            );
            setFilteredPosts(filteredPostsByCategory);
        }
    };

    return (
        <div className="container">
            <h1 className="your-post-header">All Posts</h1>
            <div>
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
            </div>
            <ul className="post-list">
                {filteredPosts.map((post, index) => (
                    <li key={post.id} className={`post-card ${index === 0 ? "first-post" : ""}`}>
                        <Link to={`AdminPostDetails/${post.id}`}>
                            <h3 className="post-title">{post.title}</h3>
                        </Link>
                        <p className="post-author">
                            <strong>Author:</strong> {post.user.first_name} {post.user.last_name}
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