import { useEffect, useState } from "react"
import { getSubscriptions, getUser } from "../APIManager"
import { useParams } from "react-router-dom"

export const Profile = () => {

    const [user, setUser] = useState({})
    const [subscriptions, setSubscriptions] = useState([])
    const [filteredSubscriptions, setFilteredSubscriptions] = useState([])

    const rareUserId = localStorage.getItem("auth_token");
    const rareUser = JSON.parse(rareUserId);
    const { userId } = useParams()

    const profileType = user.is_admin ? "Admin" : "Author"

    useEffect(() => {
        getUser(userId).then((selectedUser) => {
            setUser(selectedUser)
        })
    }, [])

    useEffect(() => {
        getSubscriptions().then((allSubscriptions) => {
            setSubscriptions(allSubscriptions)
        })
    }, [])

    useEffect(() => {
        const mySubscriptions = subscriptions.filter((subscription) => { return subscription.follower_id === rareUser })
        setFilteredSubscriptions(mySubscriptions)
    }, [subscriptions])

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
            {
                filteredSubscriptions.find((subscription) => subscription.author_id === parseInt(userId))
                ? <button>Unsubscribe</button>
                : <button>Subscribe</button>
            }
            <p>{user.bio}</p>
        </div>
    )
}