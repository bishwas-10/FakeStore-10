import React, { createContext, useState, ReactNode, useEffect } from "react";
import { RolesProps } from "../App";

interface AuthState {
  token: string | null;
}

interface UserState{
  username:string | null;
  roles:RolesProps[];
  }
interface PersistState {
  persist: boolean;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  persist: PersistState;
  setPersist: React.Dispatch<React.SetStateAction<PersistState>>;
  user:UserState;
  setUser:React.Dispatch<React.SetStateAction<UserState>>;
}

const initialAuthState: AuthState = {
  token: null,
};

const initialPersistState: PersistState = {
  persist: true,
};
const initialUserState: UserState = {
  username:null,
  roles:[]
};


const AuthContext = createContext<AuthContextType>({
  auth: initialAuthState,
  setAuth: () => {},
  persist: initialPersistState,
  setPersist: () => {},
  user: initialUserState,
  setUser: () => {}, 
  // Set an empty function as default
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(initialAuthState);
  const [user, setUser] = useState<UserState>(initialUserState);
  const [persist, setPersist] = useState<PersistState>(initialPersistState);

  useEffect(() => {
    const persistedData = localStorage.getItem("persist");
    if (persistedData) {
      setPersist(JSON.parse(persistedData));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist,user,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
