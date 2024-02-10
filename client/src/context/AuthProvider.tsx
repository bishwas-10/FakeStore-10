import React, { createContext, useState, ReactNode, useEffect } from "react";

interface AuthState {
  token: string | null;
}

interface PersistState {
  persist: boolean;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  persist: PersistState;
  setPersist: React.Dispatch<React.SetStateAction<PersistState>>;
}

const initialAuthState: AuthState = {
  token: null,
};

const initialPersistState: PersistState = {
  persist: true,
};

const AuthContext = createContext<AuthContextType>({
  auth: initialAuthState,
  setAuth: () => {},
  persist: initialPersistState,
  setPersist: () => {}, // Set an empty function as default
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(initialAuthState);
  const [persist, setPersist] = useState<PersistState>(initialPersistState);

  useEffect(() => {
    const persistedData = localStorage.getItem("persist");
    if (persistedData) {
      setPersist(JSON.parse(persistedData));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
