import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout, authRequestAsync} from '../store/authReducer/authAction';

export const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.tokenReducer.token);
  const {data: auth, status, error} = useSelector(state => state.authReducer);

  useEffect(() => {
    if (!token) return;

    dispatch(authRequestAsync());
  }, [token]);

  const delAuth = () => dispatch(authLogout());

  return [auth, status, error, delAuth];
};
