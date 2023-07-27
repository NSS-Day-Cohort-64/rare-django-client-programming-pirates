import { Route, Routes } from "react-router-dom"
import { AdminHome } from "../../components/home/AdminHome"
import { AdminSelectedPostDetails } from "../../components/posts/AdminPosts/AdminPostDetails"
import { AdminPostsList } from "../../components/posts/AdminPosts/AdminAllPosts"
import { CategoryList } from "../../managers/CategoryManager"
import { CreateNewPost } from "../../components/posts/AdminPosts/AdminNewPost"
import { TagManagerAndCreator } from "../../ManagerTags/TagManager.js"


export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/categoryManager" element={<CategoryList />} />
            <Route path="/newPost" element={<CreateNewPost />} />
            <Route path="/tagManager" element={<TagManagerAndCreator />} />
            <Route path="/posts/AdminPosts/AdminAllPosts" element={ <AdminPostsList />} />
            <Route path="/posts/AdminPosts/AdminAllPosts/AdminPostDetails/:postId" element={ <AdminSelectedPostDetails/>} />
            <Route path="/newPost" element={<CreateNewPost />} />
        </Routes>
    )
}
