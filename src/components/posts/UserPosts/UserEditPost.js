import { useEffect, useState } from "react"
import { editPost, getAllTags, getPost, getTheCategories } from "../../../APIManager"
import { Link, useNavigate, useParams } from "react-router-dom"

export const EditUserPost = () => {

    // This declares navigate as an invocation of useNavigate
    const navigate = useNavigate()

    const { postId } = useParams()

    const [post, update] = useState({
        id: 0,
        category_id: 0,
        title: "",
        image_url: "",
        content: ""
    })
    const [allCategories, setCategories] = useState([])


    useEffect(
        () => {
            getTheCategories()
                .then((categories) => {
                    setCategories(categories)
                })
        },
        []
    )

    useEffect(
        () => {
            getPost(postId)
                .then((postToEdit) => {
                    update({
                        id: postToEdit.id,
                        category_id: postToEdit.category.id,
                        title: postToEdit.title,
                        image_url: postToEdit.image_url,
                        content: postToEdit.content
                    });
                })
        },
        [postId]
    );
    

    const handleSaveButtonClick = async (event) => {
        event.preventDefault()

        await editPost(post)
        navigate(`/posts/UserPosts/UserAllPosts/UserPostDetails/${postId}`)
    }

    return (
        <>
            <main className="container">
                <form className="box">New Post
                    <fieldset className="field">
                        <input
                            type="text"
                            className="input"
                            placeholder="Title"
                            value={post.title}
                            onChange={
                                (evt) => {
                                    // This creates a copy variable of the post using the spread operator and then marks the appropriate property value to the input value and invokes update
                                    const copy = { ...post }
                                    copy.title = evt.target.value
                                    update(copy)
                                }
                            } />
                    </fieldset>
                    <fieldset className="field">
                        <input
                            type="text"
                            className="input"
                            placeholder="Image Url"
                            value={post.image_url}
                            onChange={
                                (evt) => {
                                    const copy = { ...post }
                                    copy.image_url = evt.target.value
                                    update(copy)
                                }
                            } />
                    </fieldset>
                    <fieldset className="field">
                        <input
                            type="text"
                            className="input"
                            placeholder="Article content"
                            value={post.content}
                            onChange={
                                (evt) => {
                                    const copy = { ...post }
                                    copy.content = evt.target.value
                                    update(copy)
                                }
                            } />
                    </fieldset>
                    <fieldset className="field">
                        <select
                            value={post.category_id}
                            onChange={
                                (evt) => {
                                    const copy = { ...post }
                                    copy.category_id = parseInt(evt.target.value)
                                    update(copy)
                                }
                            }>
                            <option value="0">Category Select</option>
                            {allCategories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Publish</button>
                    <Link to={`/posts/UserPosts/UserAllPosts`}>
                        <button>Cancel</button>
                    </Link>
                </form>
            </main>
        </>
    )
}
