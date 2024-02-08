import React, { createContext, useState, ReactNode } from "react";

interface AuthState {
  token: string|null ;
}

interface AuthContextType {
  auth: AuthState ;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

const initialAuthState: AuthState = {
  token: null,

};

const AuthContext = createContext<AuthContextType>({
  auth: initialAuthState,
  setAuth: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<AuthState>(initialAuthState);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
