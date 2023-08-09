import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeSignup } from '../../../reducers/Signup';

export default function useRemoveSignup() {
  const signup = useSelector((state) => state.signup);
  const dispatch = useDispatch();

  useEffect(() => {
    if (signup) dispatch(removeSignup());
  }, [signup]);
}
