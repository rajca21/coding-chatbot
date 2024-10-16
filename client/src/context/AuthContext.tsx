import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  registerUser,
} from '../utils/apiCommunicator';

type User = {
  name: string;
  email: string;
  _id: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;

  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the users cookie is valid -> skip login
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUser({
          email: data.email,
          name: data.name,
          _id: data._id,
        });
        setIsLoggedIn(true);
      }
    }

    checkStatus();
  }, []);

  const register = async (name: string, email: string, password: string) => {
    const data = await registerUser(name, email, password);
    if (data) {
      setUser({
        email: data.email,
        name: data.name,
        _id: data._id,
      });
      setIsLoggedIn(true);
    }
  };

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({
        email: data.email,
        name: data.name,
        _id: data._id,
      });
      setIsLoggedIn(true);
    }
  };

  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  const value = {
    user,
    isLoggedIn,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
