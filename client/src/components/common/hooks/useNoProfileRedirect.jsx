import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserProfile, resetUserProfileStates } from '../../../reducers/UserProfile';

// If there is no user saved in localStorage, then redirect to {path}
export default function useNoProfileRedirect(path) {
  const {
    profile, isError, message,
  } = useSelector((state) => state.userProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile) dispatch(getUserProfile());
  }, [profile, dispatch]);

  useEffect(() => {
    if (isError && message === 'Profile not found') {
      navigate(path);
    }
    dispatch(resetUserProfileStates());
  });
}
