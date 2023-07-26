import { AdminSelectedPostDetails } from "../../components/posts/AdminPosts/AdminPostDetails"

export const AdminViews = () => {
return (
    <>
   
    <Route path="INSERT HOME PATH HERE" element={< INSERT ELEMENT HERE />} />
    
    <Route path="INSERT PROFILE PATH HERE" element={< INSERT ELEMENT HERE />} />
    
    <Route path="posts/AdminPosts/AdminPostDetails/:postId" element={ <AdminSelectedPostDetails/>} />
    
    <Route path="posts/AdminPosts/AdminAllPosts" element={ <AdminViews />} />
    
    <Route path="INSERT MYPOSTS PATH HERE" element={< INSERT ELEMENT HERE />} />
    
    <Route path="INSERT TAG MANAGER PATH HERE" element={< INSERT ELEMENT HERE />} />
    
    <Route path="INSERT CATEGORY PATH HERE" element={< INSERT ELEMENT HERE />} />
    
    <Route path="INSERT USER LIST MANAGER PATH HERE" element={< INSERT ELEMENT HERE />} />

    </>
)
}