import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeSignup } from '../../../reducers/Signup';

// If there is no user saved in localStorage, then redirect to {path}
export default function useRemoveSignup() {
  const signup = useSelector((state) => state.signup);
  const dispatch = useDispatch();

  useEffect(() => {
    if (signup) dispatch(removeSignup());
  }, [signup]);
}
