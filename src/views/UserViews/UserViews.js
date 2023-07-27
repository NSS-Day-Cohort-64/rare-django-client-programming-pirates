import { Route, Routes } from "react-router-dom"
import { UserHome } from "../../components/home/UserHome"
import { CategoryList } from "../../managers/CategoryManager"
import { TagManager } from "../../UserTags/TagManager.js"
import { CreateTag } from "../../UserTags/CreateTag.js"


export const UserViews = () => {
    return (
        <Routes>
            <Route path="/" element={<UserHome />} />

            <Route path="/categoryManager" element={<CategoryList />} />

            <Route path="/tagManager" element={<TagManager />} />
            
            <Route path="/createTag" element={<CreateTag />} />

        </Routes>
    )
}

/*
    <Route path="INSERT PROFILE PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    <Route path="INSERT ALL POSTS PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    <Route path="INSERT MY POSTS PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    
*/