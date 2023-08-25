import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export interface PrivateRouteProps {
  outlet: JSX.Element;
}

const PrivateRoute = ({ outlet }: PrivateRouteProps) => {
  const auth = useAuth();

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth?.checkAuthentication().then(function (isAuthenticated) {
      setAuthenticated(isAuthenticated);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <div>Waiting for authentication</div>
  ) : authenticated ? (
    outlet
  ) : (
    <Navigate to="/login" />
  );
};
export default PrivateRoute;
