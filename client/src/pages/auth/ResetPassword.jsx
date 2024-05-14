import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendResetPassword } from '../../server/api/user/post';
import Alert from '../../components/Alert';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if (email === '' || email.length < 6) {
      setAlert({
        msg: 'El Email es obligatorio',
        error: true,
      });
      return;
    }

    try {
      const { data } = await sendResetPassword({ email });
      console.log(data);

      setAlert({
        msg: data.msg,
        error: false,
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
        Reset your password
      </h1>

      {msg && <Alert alert={alert} />}

      <form
        className="my-5 bg-gray-900 shadow rounded-lg p-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full mt-3 p-3 border bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-lime-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-lime-900 transition-colors"
        />
      </form>
    </>
  );
};

export default ResetPassword;
