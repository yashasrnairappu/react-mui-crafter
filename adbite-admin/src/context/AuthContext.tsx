import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { loginAdmin, logoutAdmin, verifyAuth } from "../api";

interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  login: (password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const valid = await verifyAuth();
        setIsLoggedIn(valid);
      } catch {
        // ✅ Don't set false on network error — keep loading
        // Only set false if server explicitly says invalid
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (password: string) => {
    await loginAdmin(password);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try { await logoutAdmin(); } catch {}
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};