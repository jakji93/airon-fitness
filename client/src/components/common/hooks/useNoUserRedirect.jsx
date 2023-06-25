import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// If there is no user saved in localStorage, then redirect to {path}
export default function useNoUserRedirect(path) {
  const {
    user,
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(path);
  }, [user]);
}
