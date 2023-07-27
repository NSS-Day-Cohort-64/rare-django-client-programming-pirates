import React, { useState, useEffect } from "react";
import { getAllTags } from "../APIManager.js";
import { useNavigate } from "react-router-dom";

export const TagManager = () => {
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const importedTags = await getAllTags();
                setTags(importedTags);
            } catch (error) {
                // Handle any errors that occurred during data fetching
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();
    }, []);

    return (
        <div>
            <h2>Tags</h2>
            <ul>
                {tags.map((tag) => (
                    <li key={tag.id}>{tag.label}</li>
                ))}
            </ul>
            <button onClick={() => navigate("/createTag")}>Add Tag</button>
        </div>
    );
};
