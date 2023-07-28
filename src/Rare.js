import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { getUser } from "./APIManager"


export const Rare = () => {
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
  const [isAdmin, setIsAdminState] = useState(parseInt(localStorage.getItem('admin')))

  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken)
    setTokenState(newToken)
  }

  const setIsAdmin = async (id) => {
    if(id !== '') {
      const user = await getUser(id)
      const newAdmin = user.is_admin
      localStorage.setItem("admin", newAdmin)
      setIsAdminState(newAdmin)
    }
    else {
      const newAdmin = 0
      localStorage.setItem("admin", newAdmin)
      setIsAdminState(newAdmin)
    }

  }

  return <>
    <NavBar token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
    <ApplicationViews token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
  </>
}
