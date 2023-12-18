export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';

export const updateToken = token => ({
  type: UPDATE_TOKEN,
  token,
});

export const deleteToken = () => ({
  type: DELETE_TOKEN,
  token: '',
});

export const tokenMiddleware = store => next => (action) => {
  if (action.type === UPDATE_TOKEN) {
    if (action.token) {
      localStorage.setItem('bearer', JSON.stringify(action.token));
    }
  }

  if (action.type === DELETE_TOKEN) {
    localStorage.removeItem('bearer');
  }

  return next(action);
};
