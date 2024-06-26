import { Outlet } from 'react-router-dom';
import Navigator from './Navigator';
const AuthLayout = () => {
  return (
    <>
      <Navigator />
      <div className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-2/5 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
