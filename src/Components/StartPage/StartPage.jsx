import {useSelector} from 'react-redux';
import style from './StartPage.module.scss';

export const StartPage = () => {
  const {name} = useSelector(state => state.authReducer.data);

  return (
    <div className={style.wrapper}>
      <p className={style.title}>Стартовая страница</p>
      <p className={style.text}>
        {
          name ? `Добро пожаловать, ${name}!` : 'Добро пожаловать!'
        }
      </p>
      <p className={style.text}>
        {
          name ? 'Выберите категорию' : 'Авторизуйтесь и выберите категорию'
        }
      </p>
    </div>
  );
};

