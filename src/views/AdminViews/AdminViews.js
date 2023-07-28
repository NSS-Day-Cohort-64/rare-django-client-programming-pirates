import { Route, Routes } from "react-router-dom"
import { AdminHome } from "../../components/home/AdminHome"
import { AdminSelectedPostDetails } from "../../components/posts/AdminPosts/AdminPostDetails"
import { AdminPostsList } from "../../components/posts/AdminPosts/AdminAllPosts"
import { CategoryList } from "../../managers/CategoryManager"
import { CreateNewAdminPost } from "../../components/posts/AdminPosts/AdminNewPost"
import { TagManagerAndCreator } from "../../ManagerTags/TagManager.js"
<<<<<<< HEAD
import { UserListManager } from "../../managers/AdminUserListManager.js"
=======
import { AdminMyPosts } from "../../components/posts/AdminPosts/AdminMyPosts"
>>>>>>> f410599777ce7292b809c98b63e0df29fad0a348


export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/posts/AdminPosts/AdminAllPosts" element={< AdminPostsList />} />
            <Route path="/categoryManager" element={<CategoryList />} />
            <Route path="/tagManager" element={<TagManagerAndCreator />} />
            <Route path="/posts/AdminPosts/AdminAllPosts/AdminPostDetails/:postId" element={ <AdminSelectedPostDetails/>} />
<<<<<<< HEAD
            <Route path="/newPost" element={<CreateNewPost />} />
            <Route path="/userListManager" element={<UserListManager />} />
=======
            <Route path="/posts/AdminPosts/AdminMyPosts" element={<AdminMyPosts />} />
            <Route path="/posts/AdminPosts/AdminNewPost" element={<CreateNewAdminPost />} />
>>>>>>> f410599777ce7292b809c98b63e0df29fad0a348
        </Routes>
    )
}
