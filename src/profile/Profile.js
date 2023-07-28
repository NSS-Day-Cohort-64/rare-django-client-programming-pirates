import { useEffect, useState } from "react"
import { getUser } from "../APIManager"
import { useParams } from "react-router-dom"

export const Profile = () => {

    const [user, setUser] = useState({})

    const { userId } = useParams()

    const profileType = user.is_admin ? "Admin" : "Author"
    
    useEffect(() => {
        getUser(userId).then((selectedUser) => {
            setUser(selectedUser)
        })
    }, [])

    return (
        <div className="container">
            {user.profile_image_url && (
                <img
                  src={user.profile_image_url}
                  alt="Post Image"
                />
              )}
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.created_on}</p>
              <p>{profileType}</p>
              <p>Clickable Article Count that takes you to post by author view</p>
              <p>{user.first_name}</p>
              <p>{user.last_name}</p>
              <button>Subscribe</button>
              <p>{user.bio}</p>
        </div>
    )
}