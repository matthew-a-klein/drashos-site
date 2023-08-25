import useAuthProvider, { IUseAuthProvider } from "./useAuthProvider";
import { createContext, ReactNode } from "react";
import React from "react";

export const AuthContext = createContext<IUseAuthProvider | null>(null);
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthProvider();
  return (
    <AuthContext.Provider value={auth}>
      {auth.loading ? null : children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
