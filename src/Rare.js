import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"

export const Rare = () => {
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
  const [isAdmin, setIsAdminState] = useState(parseInt(localStorage.getItem('admin')))
  const [userId, setUserIdState] = useState(parseInt(localStorage.getItem('user')))

  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken)
    setTokenState(newToken)
  }

  const setIsAdmin = (id) => {
      const newAdmin = 0
      localStorage.setItem("admin", newAdmin)
      setIsAdminState(newAdmin)
    
  }

  const setUserId = (id) => {
        setUserIdState(id)
        const newUser = userId
        localStorage.setItem("user", newUser)
      }

  

  return <>
    <NavBar token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin} userId ={userId} setUserId={setUserId}/>
    <ApplicationViews token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin} userId ={userId} setUserId={setUserId}/>
  </>
}
