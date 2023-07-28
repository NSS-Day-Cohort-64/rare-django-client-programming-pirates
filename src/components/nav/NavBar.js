import "./NavBar.css";
import { AdminNavBar } from "./AdminNavBar";
import { UserNavBar } from "./UserNavBar";

export const NavBar = ({ token, setToken, isAdmin, setIsAdmin }) => {
  return isAdmin !== 0 ? (
    <AdminNavBar
      token={token}
      setToken={setToken}
      isAdmin={isAdmin}
      setIsAdmin={setIsAdmin}
    />
  ) : (
    <UserNavBar
      token={token}
      setToken={setToken}
      isAdmin={isAdmin}
      setIsAdmin={setIsAdmin}
    />
  );
};
