import { Route, Routes } from "react-router-dom"
import { AdminHome } from "../../components/home/AdminHome"
import { CategoryList } from "../../managers/CategoryManager"
import { CreateNewPost } from "../../components/posts/AdminPosts/AdminNewPost"


export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/categoryManager" element={<CategoryList />} />
            <Route path="/newPost" element={<CreateNewPost />} />

        </Routes>
    )
}

/*


<Route path="INSERT PROFILE PATH HERE" element={< INSERT ELEMENT HERE />} />

<Route path="INSERT ALL POSTS PATH HERE" element={< INSERT ELEMENT HERE />} />

<Route path="INSERT MYPOSTS PATH HERE" element={< INSERT ELEMENT HERE />} />

<Route path="INSERT TAG MANAGER PATH HERE" element={< INSERT ELEMENT HERE />} />

<Route path="INSERT USER LIST MANAGER PATH HERE" element={< INSERT ELEMENT HERE />} />
*/