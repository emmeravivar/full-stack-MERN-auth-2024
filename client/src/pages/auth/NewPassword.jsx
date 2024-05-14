import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { confirmNewPassword } from '../../server/api/user/get';
import { sendNewPassword } from '../../server/api/user/post';
import Alert from '../../components/Alert';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [validationToken, setValidationToken] = useState(false);
  const [alert, setAlert] = useState({});
  const [newPassword, setNewPassword] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkTokenUser = async () => {
      try {
        await confirmNewPassword(token);
        setValidationToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    checkTokenUser();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: 'El Password debe ser minimo de 6 caracteres',
        error: true,
      });
      return;
    }

    try {
      const { data } = await sendNewPassword(token, { password });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setNewPassword(true);
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

      {validationToken && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="New Password"
              className="w-full mt-3 p-3 border bg-gray-50"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Save"
            className="bg-lime-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-lime-900 transition-colors"
          />
        </form>
      )}

      {newPassword && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Login
        </Link>
      )}
    </>
  );
};

export default NewPassword;
