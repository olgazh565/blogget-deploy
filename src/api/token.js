export const getToken = () => {
  let token;

  if (location.pathname.includes('/auth') && !location.hash.includes('post')) {
    token = new URLSearchParams(location.hash.substring(1))
      .get('access_token');
  }

  if (localStorage.getItem('bearer')) {
    token = localStorage.getItem('bearer');
  }

  return token;
};
