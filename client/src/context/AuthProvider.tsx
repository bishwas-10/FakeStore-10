import React, { createContext, useState, ReactNode } from "react";

interface AuthState {
  user: {
    username: string;
  } | null;
  token: string | null;
}

interface AuthContextType {
  auth: AuthState | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

const initialAuthState: AuthState = {
  user: null,
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
