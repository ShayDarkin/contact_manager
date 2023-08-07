import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserListContext } from "../../providers/Users";

function ProtectedRoutes() {
  const { user } = useContext(UserListContext);

  window.location.pathname;

  return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
}

export default ProtectedRoutes;
