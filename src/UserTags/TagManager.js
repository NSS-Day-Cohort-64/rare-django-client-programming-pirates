import React, { useState, useEffect } from "react";
import { getAllTags } from "../APIManager.js";
import { useNavigate } from "react-router-dom";
import "./TagManager.css";

export const TagManagerAndCreator = () => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState({ label: "" });
    const navigate = useNavigate();

    const fetchTags = async () => {
        try {
            const importedTags = await getAllTags();
            setTags(importedTags);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };
    
    useEffect(() => {

        fetchTags();
    }, []);

    const handleSaveButtonClick = async (event) => {
        event.preventDefault();

        const tagToSendToAPI = {
            label: newTag.label,
        };

        const response = await fetch("http://localhost:8000/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tagToSendToAPI),
        });

        await response.json();
        fetchTags();
    };

    return (
        <div className="container">
            <h2 className="title">Tags</h2>
            <div className="tag-manager-container">
                <div className="tag-list">
                    <ul>
                        {tags.map((tag) => (
                            <li key={tag.id} className="tag-item">
                                {tag.label}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="add-new-tag-container">
                    <form className="add-new-tag-form">
                        <h2 className="add-new-tag-form-title">Add New Tag</h2>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="label">Tag Label:</label>
                                <input
                                    required
                                    autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="What is the label of the tag?"
                                    value={newTag.label}
                                    onChange={(evt) => setNewTag({ label: evt.target.value })}
                                />
                            </div>
                        </fieldset>

                        <button
                            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                            className="add-new-tag-form-button"
                        >
                            Submit New Tag
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
