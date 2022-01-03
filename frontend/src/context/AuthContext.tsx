import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import AuthUser from "../models/AuthUser";

interface AuthContextValue {
  authUser: AuthUser;
  setAuthUser: Dispatch<SetStateAction<AuthUser>>;
}

export const AuthContext = createContext<AuthContextValue>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState<AuthUser>(null);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}
