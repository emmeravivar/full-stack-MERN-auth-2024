import User from '../models/User.model.js';
import tokenIdGenerate from '../helpers/tokenIdGenerate.js';
import jwtGenerator from '../helpers/jwtGenerate.js';
import {
  emailConfirmNewUserToken,
  emailResetPassword,
} from '../helpers/emails.js';

const createNewUser = async (req, res) => {
  console.log('Leyendo....');
  const { email } = req.body;
  const haveUserEmail = await User.findOne({ email }); //<= metodo que encuentra el primero que coincida

  if (haveUserEmail) {
    const error = new Error('You are registered');
    return res.status(403).json({ msg: error.message });
  }

  try {
    //Crear el objeto y almacenarlo
    const user = new User(req.body); //req.body es donde está almacenado en obj postman
    //Generamos el token y añadimos al objeto User que hemos creado
    user.token = tokenIdGenerate();
    await user.save();

    //Enviar el mail de confirmación
    emailConfirmNewUserToken({
      email: user.email,
      userName: user.userName,
      token: user.token,
    });

    res.json(user);
  } catch (error) {
    error = new Error('No se pudo crear el User');
    return res.status(401).json({ msg: error.message });
  }
};

const authUser = async (req, res) => {
  console.log('LYENDO DESDE...');
  //Traemos las variables
  const { email, password } = req.body;

  // //Saber si el User existe
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error('User does not exist. Please, sing up.');
    return res.status(400).json({ msg: error.message });
  }

  // Comprobar si el User está confirmado
  if (!user.tokenConfirm) {
    const error = new Error('Tu cuenta no ha sido confirmada');
    return res.status(403).json({ msg: error.message });
  }

  //Comprobar su password
  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      token: jwtGenerator(user._id),
    });
  } else {
    const error = new Error('El password es incorrecto');
    return res.status(403).json({ msg: error.message });
  }
};

// Función para confirmar la cuenta con el token
const confirmTokenUser = async (req, res) => {
  const { token } = req.params;

  //Evaluando el token buscando Users con ese token
  const haveUserTokenConfirm = await User.findOne({ token });

  // Si no existe:
  if (!haveUserTokenConfirm) {
    const error = new Error('El token no es valido');
    return res.status(403).json({ msg: error.message });
  }

  //si existe almacenamos en confirm el true y
  //eliminamos el token porque va a ser de un solo uso
  try {
    haveUserTokenConfirm.tokenConfirm = true;
    haveUserTokenConfirm.token = '';
    await haveUserTokenConfirm.save();
    res.json({ msg: 'Token confirmado' });
  } catch (error) {
    error = new Error('No se ha podido confirmar el token');
    return res.status(403).json({ msg: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;

  // //Saber si el User existe
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('User no existe');
    return res.status(400).json({ msg: error.message });
  }

  try {
    user.token = tokenIdGenerate();
    await user.save();
    res.json({ msg: 'Hemos enviado un email con las instrucciones' });

    //Enviar el mail de confirmación
    emailResetPassword({
      email: user.email,
      userName: user.userName,
      token: user.token,
    });
  } catch (error) {
    error = new Error('No se ha podido enviar el mail');
    return res.status(403).json({ msg: error.message });
  }
};

const checkTokenUser = async (req, res) => {
  const { token } = req.params;

  const haveUserValidToken = await User.findOne({ token });

  if (haveUserValidToken) {
    res.json({ msg: 'Token valido' });
  } else {
    const error = new Error('Token no valido');
    return res.status(404).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });

  if (user) {
    user.password = password;
    user.token = '';

    try {
      await user.save();
      res.json({ msg: 'Contraseña ha sido cambiada correctamente' });
    } catch (error) {
      console.log('Error');
    }
  } else {
    const error = new Error('Token no valido');
    return res.status(404).json({ msg: error.message });
  }
};

const userProfile = async (req, res) => {
  console.log('Leyendos...');
  const { User } = req;
  res.json(User);
};

const otherProfile = async (req, res) => {
  const { User } = req;
  console.log('Leyendos...', User);
  res.json(User);
};

export {
  createNewUser,
  authUser,
  confirmTokenUser,
  resetPassword,
  checkTokenUser,
  newPassword,
  userProfile,
  otherProfile,
};
