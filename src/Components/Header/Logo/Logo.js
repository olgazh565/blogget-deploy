import style from './Logo.module.scss';
import logo from './img/logo.svg';

export const Logo = () => (
  <a className={style.link} href='/'>
    <img className={style.logo} src={logo} alt='Логотип Blogget'/>
  </a>
);
