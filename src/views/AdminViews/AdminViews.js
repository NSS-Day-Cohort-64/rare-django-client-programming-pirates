import { Route, Routes } from "react-router-dom"
import { AdminHome } from "../../components/home/AdminHome"
import { AdminSelectedPostDetails } from "../../components/posts/AdminPosts/AdminPostDetails"
import { AdminPostsList } from "../../components/posts/AdminPosts/AdminAllPosts"
import { CategoryList } from "../../managers/CategoryManager"


export const AdminViews = () => {
return (
    <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="posts/AdminPosts/AdminPostDetails/:postId" element={ <AdminSelectedPostDetails/>} />
        <Route path="posts/AdminPosts/AdminAllPosts" element={ <AdminPostsList />} />
        <Route path="/categoryManager" element={<CategoryList />} />
    </Routes>
)
}