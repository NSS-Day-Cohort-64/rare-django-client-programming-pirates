import { Route, Routes } from "react-router-dom"
import { UserHome } from "../../components/home/UserHome"
import { UserPostsList } from "../../components/posts/UserPosts/UserAllPosts"
import { UserSelectedPostDetails } from "../../components/posts/UserPosts/UserPostDetails"
import { CategoryList } from "../../managers/CategoryManager"


export const UserViews = () => {
   return (
      <Routes>
         <Route path="/" element={<UserHome />} />
         <Route path="/posts/UserPosts/UserAllPosts/UserPostDetails/:postId" element={ <UserSelectedPostDetails />} />
         <Route path="posts/UserPosts/UserAllPosts" element={ <UserPostsList />} />
         <Route path="/categoryManager" element={<CategoryList />} />
    </Routes>
)
}
