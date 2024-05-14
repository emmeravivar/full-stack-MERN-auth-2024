import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendLogin } from '../../server/api/user/post';
import useAuth from '../../hooks/useAuth.jsx';
import Alert from '../../components/Alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if ([email, password].includes('')) {
      setAlert({
        msg: 'All field is mandatory',
        error: true,
      });
      return;
    }

    try {
      const { data } = await sendLogin({ email, password });
      console.log('Leeyndo', data);
      setAlert({});
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/dashboard');
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-slate-300 font-black text-4xl capitalize font-mono ">
        Login
      </h1>
      {msg && <Alert alert={alert} />}

      <form
        className="my-5  bg-gray-900 shadow rounded-lg p-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-400 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full mt-3 p-3 border  bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-400 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full mt-3 p-3 border  bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Login"
          className="bg-lime-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-lime-900 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/reset-password"
        >
          Forgot your password?
        </Link>
      </nav>
    </>
  );
};

export default Login;
