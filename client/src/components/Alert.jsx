/* eslint-disable react/prop-types */
const Alert = ({ alert }) => {
  return (
    <div
      className={`${
        alert.error ? 'bg-red-700' : 'bg-lime-900'
      } bg-gradient-to-br text-center p-3 uppercase text-white font-bold text-sm my-5 `}
    >
      {alert.msg}
    </div>
  );
};

export default Alert;
