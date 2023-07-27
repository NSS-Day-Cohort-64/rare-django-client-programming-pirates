import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { AdminViews } from "./AdminViews/AdminViews";
import { UserViews } from "./UserViews/UserViews";

export const ApplicationViews = ({ token, setToken, isAdmin, setIsAdmin }) => {

  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} setIsAdmin={setIsAdmin}/>} />
      <Route path="/register" element={<Register setToken={setToken} setIsAdmin={setIsAdmin}/>} />
      <Route element={<Authorized token={token} />}>
        {isAdmin != 0 ? (
          <Route path="*" element={<AdminViews />} />
        ) : (
          <Route path="*" element={<UserViews />} />
        )}
      </Route>
    </Routes>
  );
};