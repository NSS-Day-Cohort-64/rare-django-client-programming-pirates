import React, { useState, useEffect } from "react";
import { getPostTags } from "../APIManager.js";

export const PostTagManager = ({ postId }) => {
    const [postTags, setPostTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);

    const fetchPostTags = async () => {
        try {
            const postTagsData = await getPostTags(postId);
            setPostTags(postTagsData);
        } catch (error) {
            console.error("Error fetching post tags:", error);
        }
    };

    const fetchAvailableTags = async () => {
        try {
            const availableTagsData = await getAllTags();
            setAvailableTags(availableTagsData);
        } catch (error) {
            console.error("Error fetching available tags:", error);
        }
    };

    useEffect(() => {
        fetchPostTags();
        fetchAvailableTags();
    }, [postId]);

    // Other functions for handling tag selection, association, etc.

    return (
        <div>
            <h2>Manage Tags:</h2>
            {/* Display available tags, selected tags, and manage functionality */}
        </div>
    );
};
