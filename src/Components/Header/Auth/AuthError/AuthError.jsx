import style from './AuthError.module.scss';
import {useRef} from 'react';
import {createPortal} from 'react-dom';
import {ReactComponent as CloseIcon} from '../img/close.svg';

export const AuthError = ({error, closeAlert}) => {
  const closeBtnRef = useRef(null);

  const handleCloseAlert = e => {
    const target = e.target;
    if (closeBtnRef.current?.contains(target)) {
      closeAlert();
    }
  };

  return createPortal(
    <div className={style.background}>
      <p>Ошибка авторизации:</p>
      <i>{error}</i>
      <button
        className={style.close}
        ref={closeBtnRef}
        onClick={handleCloseAlert}
      >
        <CloseIcon />
      </button>
    </div>,
    document.getElementById('root')
  );
};

