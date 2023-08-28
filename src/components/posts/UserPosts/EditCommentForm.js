import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { commentUpdate } from "../../../managers/comments";

export const EditCommentForm = ({ comment }) => {
    const [commentEdit, setCommentEdit] = useState({
        post_id: 0,
        author_id: 0,
        content: "",
    });
    const navigate = useNavigate();

    const handleFieldChange = (evt) => {
        const stateToChange = { ...commentEdit };
        stateToChange.content = evt.target.value;
        setCommentEdit(stateToChange);
    };

    useEffect(() => {
        if (comment && comment.fields) {
            const { content } = comment.fields; 
            setCommentEdit({ ...commentEdit, content }); 
        }
    }, [comment]); 

    const handleSave = (evt) => {
        evt.preventDefault();
        const editedComment = {
            id: commentEdit.id,
            post: commentEdit.post_id,
            author: commentEdit.author_id,
            content: commentEdit.content,
        };
        commentUpdate(editedComment).then(() => {
            window.location.reload();
        });
    };

    return (
        <form className="commentForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Edit Comment:</label>
                    <input
                        type="text"
                        id="content"
                        onChange={handleFieldChange}
                        required
                        autoFocus
                        className="form-control"
                        value={commentEdit.content}
                    />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={handleSave}>
                Save
            </button>
            <button
                className="btn btn-primary"
                onClick={() => navigate(`/posts/UserPosts/UserAllPosts/UserPostDetails`)}
            >
                Cancel
            </button>
        </form>
    );
};
