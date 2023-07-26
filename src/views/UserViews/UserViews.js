import { UserSelectedPostDetails } from "../../components/posts/UserPosts/UserPostDetails"

export const UserViews = () => {
 return (
   <>
   <Route path="INSERT HOME PATH HERE" element={<INSERT ELEMENT HERE />} />
   
   <Route path="INSERT PROFILE PATH HERE" element={<INSERT ELEMENT HERE />} />
   
   <Route path="posts/UserPosts/UserPostDetails/:postId" element={ <UserSelectedPostDetails />} />

   <Route path="posts/UserPosts/UserAllPosts" element={ <UserPostsList />} />
   
   <Route path="INSERT MY POSTS PATH HERE" element={<INSERT ELEMENT HERE />} />
   
   <Route path="INSERT TAG MANAGER PATH HERE" element={<INSERT ELEMENT HERE />} />
   
   <Route path="INSERT CATEGORY MANAGER PATH HERE" element={<INSERT ELEMENT HERE />} />
   </>
 )
}