import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../server/api/user/get';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem('token');
      console.log('Entrando aquí... =>', token);

      if (!token) {
        console.log('Leyendo aqui..');
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        console.log('Leyendo en try');
        const { data } = await getUserProfile(config);
        console.log('Data:', data);
        setAuth(data);
        navigate('/dashboard');
      } catch (error) {
        setAuth({});
      }

      setLoading(false);
    };
    authUser();
  }, []);

  const closeSesion = () => {
    setAuth({});
    localStorage.clear();
    navigate('/');
  };
  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
        loading,
        closeSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
