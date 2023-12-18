import style from './Auth.module.scss';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text/Text';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {deleteToken} from '../../../store/tokenReducer/tokenAction';
import {useAuth} from '../../../hooks/useAuth';
import {Loader} from '../../../UI/Loader/Loader';
import {AuthError} from './AuthError/AuthError';
import {resetPostsState} from '../../../store/postsReducer/postsSlice';
import {useNavigate} from 'react-router-dom';

export const Auth = () => {
  const dispatch = useDispatch();
  const [auth, status, error, delAuth] = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  const [isErrAlert, setErrAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'error') setErrAlert(true);
  }, [status]);

  const handleLogout = () => {
    setShowLogout(!showLogout);
  };

  const handleClearAuth = () => {
    delAuth();
    dispatch(deleteToken());
    dispatch(resetPostsState());
    setShowLogout(false);
    navigate('/');
  };

  return (
    <div className={style.container}>
      {status === 'loading' && <Loader />}
      {isErrAlert && (
        <AuthError
          error={error}
          closeAlert={() => setErrAlert(false)}
        />
      )}
      {status === 'loaded' && (
        <button className={style.btn} onClick={handleLogout}>
          <img
            className={style.img}
            src={auth.img}
            title={auth.name}
            alt={auth.name} />
          <Text>{auth.name}</Text>
        </button>
      )}
      {(!status || status === 'error') && (
        <Text className={style.authLink} As='a' href={urlAuth}>
          <LoginIcon className={style.svg} />
        </Text>
      )}
      {
        showLogout && (
          <button
            className={style.logout}
            onClick={handleClearAuth}
          >
            Выйти
          </button>
        )
      }
    </div>
  );
};
