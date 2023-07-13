/* eslint-disable import/prefer-default-export */

export const createBearerTokenHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.token) throw new Error('Cannot get user profile, user not logged in');

  const headers = {
    Authorization: `Bearer ${user.token}`,
  };
  return headers;
};
