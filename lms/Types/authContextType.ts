interface AuthContextType {
  authenticated: boolean;
  loading: boolean;
  checkAuth: () => Promise<void>;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default AuthContextType;
