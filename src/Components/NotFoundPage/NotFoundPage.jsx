import style from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={style.wrapper}>
    <p className={style.error}>404</p>
    <p className={style.text}>Такой страницы не существует</p>
  </div>
);

