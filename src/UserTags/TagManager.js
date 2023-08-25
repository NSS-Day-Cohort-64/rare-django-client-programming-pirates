import React, { useState, useEffect } from "react";
import { editTag, getAllTags } from "../APIManager.js";
import { useNavigate } from "react-router-dom";
import "./TagManager.css";
import { deleteTag } from "../APIManager.js";

export const TagManagerAndCreator = () => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState({ label: "" });
    const [tagsToDelete, setTagsToDelete] = useState([])
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const navigate = useNavigate();

    const fetchTags = async () => {
        try {
            const importedTags = await getAllTags()
            setTags(importedTags);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };


    useEffect(() => {

        fetchTags();
    }, []);


    const handleCheckboxChange = (event) => {
        const checkboxId = event.target.id;

        if (event.target.checked) {
            setTagsToDelete((prevTags) => [...prevTags, checkboxId]);
        } else {
            setTagsToDelete((prevTags) => prevTags.filter((tagId) => tagId !== checkboxId));
        }
    };

    const handleSaveButtonClick = async (event) => {
        event.preventDefault();

        const tagToSendToAPI = {
            label: newTag.label,
        };

        const response = await fetch("http://localhost:8000/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": ` Token ${localStorage.getItem("auth_token")}`
            },
            body: JSON.stringify(tagToSendToAPI),
        });

        await response.json();
        fetchTags();
    };

    const handleDeleteConfirmation = async () => {
        setShowConfirmationDialog(false);
        try {
          for (const tagId of tagsToDelete) {
            await deleteTag(tagId); // Use your APIManager function to delete the tag
          }
          
         await fetchTags();
        } catch (error) {
          console.error("Error deleting tags:", error);
        }
      };
      
    const handleEditButton = async function(event) {
        const tagToEdit = event.target.value
        await editTag(tagToEdit)
        await fetchTags()
    }
      

    return (
        <div className="container">
            <h2 className="title">Tags</h2>
            <div className="tag-manager-container">
                <div className="tag-list">
                    <ul>
                        {tags.map((tag) => (
                      
                            <div key={`div--${tag.id}`} className="tag-container">
                                <button value={tag.id} onClick={handleEditButton}>edit</button>
                                <li key={tag.id} className="tag-item">
                                    {tag.label}
                                </li>
                                <div className="checkbox--container">
                                    <label className="delete" htmlFor={tag.id}> </label>
                                    <input id={tag.id} key={`tag--${tag.id}`} onChange={handleCheckboxChange} value={tag.id} type="checkbox" />
                                </div>
                            </div>
                            
                        ))}
                    </ul>
                    <button onClick={() => setShowConfirmationDialog(true)}>delete selected tags</button>
                    {showConfirmationDialog && (
                        <div className="confirmation-overlay">
                            <div className="confirmation-dialog">
                                <p>Are you sure you want to delete the selected tags?</p>
                                <button onClick={handleDeleteConfirmation}>Confirm</button>
                                <button onClick={() => setShowConfirmationDialog(false)}>Cancel</button>
                            </div>
                        </div>
                    )}

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
