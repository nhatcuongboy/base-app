import { Navigate, Outlet } from 'react-router-dom';

export interface ProtectedRouteState {
  isAllowed: boolean;
  redirectPath?: string;
  children?: any;
}

const ProtectedRoute = ({
  isAllowed = true,
  redirectPath = '/',
  children,
}: ProtectedRouteState) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
