import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import Loading from "../Loading/Loading";

function PrivateRouter() {
  const { authenticated, isLoading } = useUserContext();

  if (isLoading) {
    return <Loading />;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRouter;
