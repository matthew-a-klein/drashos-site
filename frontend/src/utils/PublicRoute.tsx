import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export interface PublicRouteProps {
  outlet: JSX.Element;
}

const PublicRoute = ({ outlet }: PublicRouteProps) => {
  const auth = useAuth();

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth?.checkAuthentication().then(function (isAuthenticated) {
      setAuthenticated(isAuthenticated);
      setLoading(false);
    });
  }, []);

  return loading ? <></> : authenticated ? <Navigate to="/admin" /> : outlet;
};
export default PublicRoute;
