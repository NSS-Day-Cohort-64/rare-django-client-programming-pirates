import { useEffect, useState } from "react"
import { getTheCategories } from "../../../APIManager"

export const CreateNewPost = () => {

    const userId = localStorage.getItem("auth_token")

    const [post, update] = useState({
        user_id: userId,
        category_id: 0,
        title: "",
        publication_date: 0,
        image_url: "",
        content: "",
        approved: 1
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
                        <select
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
                </form>
            </main>
        </>
    )
}