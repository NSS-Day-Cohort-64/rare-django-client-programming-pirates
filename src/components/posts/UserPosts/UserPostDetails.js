import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../../../managers/posts";
import "./myPosts.css";
import { togglePostApproval, getAllTags, editPostTags } from "../../../APIManager";


export const UserSelectedPostDetails = () => {
    const { postId } = useParams();
    const [selectedPost, setSelectedPost] = useState([]);
    const [tags, setTags] = useState([]);
    const [isEditingTags, setIsEditingTags] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    const getPostDetails = () => {
        getPostById({ postId }).then((UserSelectedPostDetails) => {
            setSelectedPost(UserSelectedPostDetails);
        });
    };

    useEffect(() => {
        if (postId) {
            getPostDetails();
        }
    }, [postId]);

    useEffect(() => {
        getAllTags().then((tags) => setTags(tags))
    }, [])

    const handleToggleApproval = () => {
        togglePostApproval(postId, selectedPost.approved).then(() => {
            getPostDetails();
        });
    };

    const handleTagCheckboxChange = (tagId) => {
        if (selectedTags.includes(tagId)) {
            setSelectedTags(selectedTags.filter(id => id !== tagId));
        } else {
            setSelectedTags([...selectedTags, tagId]);
        }
    };

    const handleSaveTags = async () => {
        await editPostTags(postId, selectedTags) 
            setIsEditingTags(false)
            getPostDetails();
    };

    return (
        <div>
            <h1>Post Details:</h1>
            {selectedPost && (
                <article className="post-card">
                    <h3>{selectedPost.title}</h3>
                    <p>
                        Author:{" "}
                        <Link to={`/Profile/${selectedPost.user?.id}`}>
                            {selectedPost?.author?.full_name}
                        </Link>
                    </p>
                    <p>Category: {selectedPost?.category?.label}</p>
                    <p>Publication date & Time: {selectedPost?.publication_date}</p>
                    <p>Approved: {selectedPost.approved ? "Yes" : "No"}
                        <br />
                        <input type="checkbox" checked={selectedPost.approved} onChange={handleToggleApproval} /></p>
                    <p>Content: {selectedPost?.content}</p>
                    <p>Tags: {selectedPost?.tags} </p>
                </article>
            )}

            {/* button for Manage Tags, handle function to set state to true
        if true, map over tags and show list with checkboxes

        save button, onclick - handle set selected tags

         */}

            {isEditingTags ? (
                <div>
                    <h4>Select Tags:</h4>
                    <ul>
                        {tags.map((tag) => (
                            <li
                                key={tag.id}
                                onClick={() => handleTagCheckboxChange(tag.id)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedTags.includes(tag.id)}
                                    onChange={() => handleTagCheckboxChange(tag.id)}
                                />
                                {tag.label}
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleSaveTags}>Save</button>
                </div>
            ) : (
                <button onClick={() => setIsEditingTags(true)}>Manage Tags</button>
            )}

            <div>
                <Link to={`/posts/${postId}/view-comments`}>
                    <button>View Comments</button>
                </Link>
                <Link to={`/posts/${postId}/add-comment`}>
                    <button>Add Comment</button>
                </Link>
            </div>
        </div>
    );
}