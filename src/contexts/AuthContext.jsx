import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Tạo Auth Context
const AuthContext = createContext();

// Custom hook để sử dụng Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Kiểm tra token khi app khởi động
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          // Set token cho axios requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // Có thể verify token với server (tùy vào API)
          // Ở đây chúng ta sẽ chỉ check xem token có tồn tại không
          setIsAuthenticated(true);
          // Có thể lưu thêm user info nếu có
          setUser({ email: 'user@example.com' }); // Placeholder
        } catch (error) {
          console.error('Token validation failed:', error);
          logout(); // Auto logout nếu token invalid
        }
      }

      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      const token = data.accessToken;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser({ email });
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Đăng nhập thất bại'
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Đã đăng xuất thành công');
  };

  // Register function
  const register = async (email, password) => {
    try {
      await axios.post('http://localhost:3000/register', {
        email,
        password,
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Đăng ký thất bại'
      };
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

