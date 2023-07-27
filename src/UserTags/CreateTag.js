import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateTag = () => {
    const [tag, setTag] = useState({
        label: ""
    });
    const navigate = useNavigate();

    const handleSaveButtonClick = async (event) => {
        event.preventDefault();

        try {
            const tagToSendToAPI = {
                label: tag.label
            };

            const response = await fetch("http://localhost:8088/tags", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tagToSendToAPI)
            });

            if (!response.ok) {
                throw new Error("Failed to add the tag.");
            }

            navigate("/tagManager");
        } catch (error) {
            console.error("Error adding the tag:", error);
        }
    };

    return (
        <form className="add-new-tag-form">
            <h2 className="add-new-tag-form-title">Add New Investment</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="label">Tag Label:</label>
                    <input
                        required
                        autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What is the label of the tag?"
                        value={tag.label}
                        onChange={(evt) => {
                            const copy = { ...tag };
                            copy.label = evt.target.value;
                            setTag(copy);
                        }}
                    />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="add-new-label-form-button"
            >
                Submit New Tag
            </button>
        </form>
    );
};
