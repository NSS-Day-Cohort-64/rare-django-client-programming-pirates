import { Route, Routes } from "react-router-dom"
import { UserHome } from "../../components/home/UserHome"
import { CategoryList } from "../../managers/CategoryManager"


export const UserViews = () => {
    return (
        <Routes>
            <Route path="/" element={<UserHome />} />
            <Route path="/categoryManager" element={<CategoryList />} />

        </Routes>
    )
}

/*
    <Route path="INSERT PROFILE PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    <Route path="INSERT ALL POSTS PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    <Route path="INSERT MY POSTS PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    <Route path="INSERT TAG MANAGER PATH HERE" element={<INSERT ELEMENT HERE />} />
    
*/