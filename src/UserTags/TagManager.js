import React, { useState, useEffect } from "react";
import { editTag, getAllTags, deleteTag } from "../APIManager.js";
import { useNavigate } from "react-router-dom";
import "./TagManager.css";

export const TagManagerAndCreator = () => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState({ label: "" });
    const [tagsToDelete, setTagsToDelete] = useState([])
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [editModes, setEditModes] = useState({}); // Initialize an empty object
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

    //func posts new tag
    const handleSaveButtonClick = async (event) => {
        event.preventDefault();
        const tagToSendToAPI = {
            label: newTag.label
        };
        const postNewTag = await fetch("http://localhost:8000/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tagToSendToAPI),
        });
        await postNewTag.json();
        fetchTags();
    };

    //func sets tagsToDelete state to all the marked tags
    const handleCheckboxChange = (event) => {
        const checkboxId = event.target.id;

        event.target.checked ? setTagsToDelete((prevTags) => [...prevTags, checkboxId]) :
            setTagsToDelete((prevTags) => prevTags.filter((tagId) => tagId !== checkboxId))
    };

    //func deletes the selected tag(s)
    const handleDeleteConfirmation = async () => {
        setShowConfirmationDialog(false);
        try {
            for (let tagId of tagsToDelete) {
                await deleteTag(tagId);
            }
        } catch (error) {
            console.error("Error deleting tags:", error);
        }
        await fetchTags();
    };

    const handleEditButton = async (event) => {
        const tagToEdit = event.target.value;
        setEditModes((prevEditModes) => ({
            ...prevEditModes,
            [tagToEdit]: !prevEditModes[tagToEdit],
        }));    
    };

    const updateTag = async (event) => {
        const tagToEdit = parseInt(event.target.value);
        const foundTag = tags.filter(tag => tag.id == tagToEdit)
        await editTag(tagToEdit, foundTag[0] )
        setEditModes((prevEditModes) => ({
            ...prevEditModes,
            [tagToEdit]: false
        }))
    }

    const cancelEdit = function(evt){
        setEditModes({})
    }

//  
    return (
        <div className="container">
            <h2 className="title">Tags</h2>
            <div className="tag-manager-container">
                <div className="tag-list">
                    <ul>
                        {tags.map((tag) => (
                            <div key={`div--${tag.id}`} className={`tag-container `}>
                                {editModes[tag.id] ? (
                                    <button onClick={cancelEdit} >cancel</button>
                                ): 
                                <button value={tag.id} onClick={handleEditButton}>edit</button>                          
                                }
                                {editModes[tag.id] ? (
                                    <>
                                    <input
                                        className={`${editModes[tag.id] ? 'edit-mode' : ''}`}
                                        value={tag.label}
                                        onChange={(e) => {
                                            const newLabel = e.target.value;
                                            setTags((prevTags) =>
                                                prevTags.map((prevTag) =>
                                                    prevTag.id === tag.id ? { ...prevTag, label: newLabel } : prevTag
                                                )
                                            );
                                        }}
                                    />
                                    <button value={tag.id} onClick={updateTag }>confirm change</button>
                                    </>
                                ) : 
                                (
                                    <li key={tag.id} className="tag-item">
                                        {tag.label}
                                    </li>
                                )}
                                <div className="checkbox--container">
                                    <label className="delete" htmlFor={tag.id}> </label>
                                    <input id={tag.id} key={`tag--${tag.id}`} onChange={handleCheckboxChange} value={tag.id} type="checkbox" />
                                </div>
                            </div>

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