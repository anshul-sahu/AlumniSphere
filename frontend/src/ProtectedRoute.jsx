import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({allowedRoles}){

    const token = localStorage.getItem("token");

    if( !token){
      return <Navigate to="/signIn" replace />
    }

    return <Outlet />
};

export default ProtectedRoute;