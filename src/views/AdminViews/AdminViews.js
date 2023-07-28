import { Route, Routes } from "react-router-dom"
import { AdminHome } from "../../components/home/AdminHome"
import { AdminSelectedPostDetails } from "../../components/posts/AdminPosts/AdminPostDetails"
import { AdminPostsList } from "../../components/posts/AdminPosts/AdminAllPosts"
import { CategoryList } from "../../managers/CategoryManager"
import { CreateNewPost } from "../../components/posts/AdminPosts/AdminNewPost"
import { TagManagerAndCreator } from "../../ManagerTags/TagManager.js"
import { UserListManager } from "../../managers/AdminUserListManager.js"


export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/posts/AdminPosts/AdminAllPosts" element={< AdminPostsList />} />
            <Route path="/categoryManager" element={<CategoryList />} />
            <Route path="/newPost" element={<CreateNewPost />} />
            <Route path="/tagManager" element={<TagManagerAndCreator />} />
<<<<<<< HEAD
            <Route path="/userListManager" element={<UserListManager />} />



=======
            <Route path="/posts/AdminPosts/AdminAllPosts" element={ <AdminPostsList />} />
            <Route path="/posts/AdminPosts/AdminAllPosts/AdminPostDetails/:postId" element={ <AdminSelectedPostDetails/>} />
            <Route path="/newPost" element={<CreateNewPost />} />
>>>>>>> b9e42d3bf2286e7eb4637bdda3efc5856f7e4cd9
        </Routes>
    )
}
