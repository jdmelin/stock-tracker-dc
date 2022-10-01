import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ onSetIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    onSetIsLoggedIn(false);
    navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default Logout;
