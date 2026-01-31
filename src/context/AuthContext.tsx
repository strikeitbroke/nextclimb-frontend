import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import api from "../api/axios";

export interface User {
  email: string;
  name: string;
  picture: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (idToken: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "nextclimb_user";
const TOKEN_STORAGE_KEY = "nextclimb_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (idToken: string) => {
    try {
      const response = await api.post("/auth/google", {
        token: idToken,
      });
      const { token: jwt, user: userData } = response.data;

      setToken(jwt);
      setUser(userData);
      localStorage.setItem(TOKEN_STORAGE_KEY, jwt);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error("Login error: ", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
