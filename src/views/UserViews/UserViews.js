import { Route, Routes } from "react-router-dom"
import { UserHome } from "../../components/home/UserHome"

export const UserViews = () => {
   return (
      <Routes>
          <Route path="/" element={<UserHome />} />
      
  
      </Routes>
  )
}

/*
    <Route path="INSERT PROFILE PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    <Route path="INSERT ALL POSTS PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    <Route path="INSERT MY POSTS PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    <Route path="INSERT TAG MANAGER PATH HERE" element={<INSERT ELEMENT HERE />} />
    
    <Route path="INSERT CATEGORY MANAGER PATH HERE" element={<INSERT ELEMENT HERE />} />
*/