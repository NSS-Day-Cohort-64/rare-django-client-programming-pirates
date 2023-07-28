import { useEffect, useState } from "react"
import { editPost, getAllTags, getPost, getTheCategories } from "../../../APIManager"
import { useNavigate, useParams } from "react-router-dom"

export const EditUserPost = () => {

    // This declares navigate as an invocation of useNavigate
    const navigate = useNavigate()

    const userId = localStorage.getItem("auth_token")
    const { postId } = useParams()

    const [post, update] = useState({
        user_id: parseInt(userId),
        category_id: 0,
        title: "",
        publication_date: 0,
        image_url: "",
        content: "",
        approved: 1
    })

    const [postTags, updatePostTags] = useState([])

    const [allCategories, setCategories] = useState([])
    const [allTags, setTags] = useState([])

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
            getAllTags()
                .then((tags) => {
                    setTags(tags)
                })
        },
        []
    )

    useEffect(
        () => {
            getPost(postId)
                .then((postToEdit) => {
                    const copy = { ...post }
                    copy.id = parseInt(postId);
                    copy.user_id = postToEdit.user_id;
                    copy.category_id = postToEdit.category_id;
                    copy.title = postToEdit.title;
                    copy.publication_date = postToEdit.publication_date;
                    copy.image_url = postToEdit.image_url;
                    copy.content = postToEdit.content;
                    copy.approved = postToEdit.approved
                    update(copy)
                })
        },
        []
    )

    useEffect(
        () => {
            getCurrentDate()
        },
        []
    )

    const getCurrentDate = () => {
        const currentDate = new Date()
        const formattedDate = currentDate.toDateString().substring(4)
        const copy = { ...post }
        copy.publication_date = formattedDate
        update(copy)
    }

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
                                    copy.category_id = evt.target.value
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
                    <fieldset className="field">
                        {allTags.map((tag) => (
                            <div key={tag.id}>
                                <label className="checkbox" htmlFor="Tags">{tag.label}</label>
                                <input
                                    type="checkbox"
                                    name={tag.label}
                                    value={tag.id}
                                    onChange={
                                        (evt) => {
                                            // Assigning tags is a separate ticket so this is currently incomplete
                                            const copy = { ...postTags }
                                            copy.tag = evt.target.value
                                            updatePostTags(copy)
                                        }
                                    } />
                            </div>
                        ))}
                    </fieldset>
                    <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Publish</button>
                </form>
            </main>
        </>
    )
}