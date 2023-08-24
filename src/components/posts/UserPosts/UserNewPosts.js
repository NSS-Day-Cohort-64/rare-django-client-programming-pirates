
import { useEffect, useState } from "react";
import { createNewPost, getAllTags, getTheCategories } from "../../../APIManager";
import { useNavigate } from "react-router-dom";

export const CreateNewUserPost = () => {
    const navigate = useNavigate();

    const [post, update] = useState({

        category_id: 0,
        title: "",
        image_url: "",
        content: ""
    });

    const [checkedPostTags, updateCheckedPostTags] = useState([]);
    const [allCategories, setCategories] = useState([]);

    useEffect(() => {
        getTheCategories().then((categories) => {
            setCategories(categories);
        });
    }, []);


    const handleSaveButtonClick = async (event) => {
        event.preventDefault();

        // Update the post object with the selectedTagIds before saving
        const finishedPost = { ...post };


        const createdPost = await createNewPost(finishedPost);
        navigate(`/posts/UserPosts/UserAllPosts`);
    };

    return (
        <>
            <main className="container">    
                <form className="box">
                    New Post
                    <fieldset className="field">
                        <input
                            type="text"
                            className="input"
                            placeholder="Title"
                            value={post.title}
                            onChange={(evt) => {
                                const copy = { ...post };
                                copy.title = evt.target.value;
                                update(copy);
                            }}
                        />
                    </fieldset>
                    <fieldset className="field">
                        <input
                            type="text"
                            className="input"
                            placeholder="Image Url"
                            value={post.image_url}
                            onChange={(evt) => {
                                const copy = { ...post };
                                copy.image_url = evt.target.value;
                                update(copy);
                            }}
                        />
                    </fieldset>
                    <fieldset className="field">
                        <input
                            type="text"
                            className="input"
                            placeholder="Article content"
                            value={post.content}
                            onChange={(evt) => {
                                const copy = { ...post };
                                copy.content = evt.target.value;
                                update(copy);
                            }}
                        />
                    </fieldset>
                    <fieldset className="field">
                        <select
                            onChange={(evt) => {
                                const copy = { ...post };
                                copy.category_id = evt.target.value;
                                update(copy);
                            }}
                        >
                            <option value="0">Category Select</option>
                            {allCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    
                    <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                        Publish
                    </button>
                </form>
            </main>
        </>
    );
};
