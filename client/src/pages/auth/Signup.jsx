import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert';
import { sendNewUser } from './../../server/api/user/post';

const Signup = () => {
  const [newUser, setNewUser] = useState({
    userName: '',
    email: '',
    password: '',
    password2: '',
  });
  const [alert, setAlert] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    const newUserData = { ...newUser, [name]: value };
    setNewUser(newUserData);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { userName, email, password, password2 } = newUser;

    if ([userName, email, password, password2].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    if (password !== password2) {
      setAlert({
        msg: 'Los password no son iguales',
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        msg: 'El Password es muy corto, agrega mínimo 6 caracteres',
        error: true,
      });
      return;
    }

    setAlert({});

    // Crear el usuario en la API
    try {
      const { data } = await sendNewUser(newUser);
      setAlert({
        msg: data.msg,
        error: false,
      });

      setNewUser({
        userName: '',
        email: '',
        password: '',
        password2: '',
      });
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
        Signup
      </h1>

      {msg && <Alert alerta={alert} />}

      <form
        className="my-5  bg-gray-900 shadow rounded-lg p-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="Username"
          >
            Username
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            placeholder="Username"
            className="w-full mt-3 p-3 border bg-gray-50"
            value={newUser.userName}
            onChange={handleChange}
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="w-full mt-3 p-3 border bg-gray-50"
            value={newUser.email}
            onChange={handleChange}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="w-full mt-3 p-3 border  bg-gray-50"
            value={newUser.password}
            onChange={handleChange}
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
          >
            Password, again
          </label>
          <input
            id="password2"
            name="password2"
            type="password"
            placeholder="Password, again"
            className="w-full mt-3 p-3 border bg-gray-50"
            value={newUser.password2}
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          value="Sing up"
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

export default Signup;
