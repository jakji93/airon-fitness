export const createBearerTokenHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.token) throw new Error('Cannot get user profile, user not logged in');

  const headers = {
    Authorization: `Bearer ${user.token}`,
  };
  return headers;
};

export const createNotification = (title, body, redirect = 'http://localhost:3000/app') => {
  const notification = new Notification(title, {
    body,
    icon: 'http://localhost:3000/Logo-Brain.ico',
  });
  notification.onclick = () => {
    window.location.href = redirect;
  };
};
