import { useEffect, useState } from "react";
import axios from "axios";
import { AuthTokens } from "../models/AuthTokens";

export interface IUseAuthProvider {
  signIn: (username: string, password: string) => Promise<number>;
  signOut: () => void;
  setAuthTokens: React.Dispatch<React.SetStateAction<AuthTokens | null>>;
  checkAuthentication: () => Promise<boolean>;
  authTokens: AuthTokens | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const useAuthProvider = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")!)
      : null
  );

  const signInUsernamePassword = async (username: string, password: string) => {
    return axios
      .post("/api/userauth/token/", {
        username: username,
        password: password,
      })
      .then(function (response) {
        if (response.status === 200) {
          setAuthTokens(response.data);
          localStorage.setItem("authTokens", JSON.stringify(response.data));
          setIsAuthenticated(true);
        }
        return response.status;
      })
      .catch(function (response) {
        setIsAuthenticated(false);
        return response.status;
      });
  };

  const postRefreshToken = async (refreshToken: string) => {
    return axios
      .post(`/api/userauth/token/refresh/`, {
        refresh: refreshToken,
      })
      .then(function (response) {
        const data = response.data;
        if (response.status === 200) {
          localStorage.setItem("authTokens", JSON.stringify(data));
          setAuthTokens(data);
          setIsAuthenticated(true);
        }
        return response.status;
      })
      .catch(function (response) {
        setIsAuthenticated(false);
        return response.status;
      });
  };

  const checkAuthentication = async () => {
    const tokens: AuthTokens = JSON.parse(localStorage.getItem("authTokens")!);
    if (tokens === null) {
      return false;
    } else {
      const responseStatus = await postRefreshToken(tokens.refresh);
      if (responseStatus === 200) {
        return true;
      } else return false;
    }
  };

  const signOut = () => {
    setAuthTokens(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authTokens");
  };

  useEffect(() => {
    setLoading(false);
  }, [authTokens, loading]);

  return {
    authTokens,
    loading,
    isAuthenticated,
    checkAuthentication,
    signIn: signInUsernamePassword,
    signOut,
    setAuthTokens,
  };
};

export default useAuthProvider;
