import { Route, Routes } from "react-router-dom"
import { AdminHome } from "../../components/home/AdminHome"
import { AdminSelectedPostDetails } from "../../components/posts/AdminPosts/AdminPostDetails"
import { AdminPostsList } from "../../components/posts/AdminPosts/AdminAllPosts"
import { CategoryList } from "../../managers/CategoryManager"
import { CreateNewAdminPost } from "../../components/posts/AdminPosts/AdminNewPost"
import { TagManagerAndCreator } from "../../ManagerTags/TagManager.js"
import { MyPosts } from "../../components/posts/UserPosts/UserMyPosts"


export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/posts/AdminPosts/AdminAllPosts" element={< AdminPostsList />} />
            <Route path="/categoryManager" element={<CategoryList />} />
            <Route path="/tagManager" element={<TagManagerAndCreator />} />
            <Route path="/posts/AdminPosts/AdminAllPosts/AdminPostDetails/:postId" element={ <AdminSelectedPostDetails/>} />
            <Route path="/MyPosts" element={<MyPosts />} />
            <Route path="/newPost" element={<CreateNewAdminPost />} />
        </Routes>
    )
}
