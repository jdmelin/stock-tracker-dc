import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isLoggedIn }) {
  const hasToken = !!localStorage.getItem('token');

  if (!isLoggedIn && !hasToken) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}

export default ProtectedRoute;
