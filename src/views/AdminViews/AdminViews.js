import { Route, Routes } from "react-router-dom"
import { AdminHome } from "../../components/home/AdminHome"
import { CategoryList } from "../../managers/CategoryManager"
import { TagManagerAndCreator } from "../../ManagerTags/TagManager.js"
import { UserListManager } from "../../managers/AdminUserListManager.js"


export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/categoryManager" element={<CategoryList />} />
            <Route path="/tagManager" element={<TagManagerAndCreator />} />
            <Route path="/userListManager" element={<UserListManager />} />



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