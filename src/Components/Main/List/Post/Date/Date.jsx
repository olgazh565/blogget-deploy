import {formatDate} from '../../../../../utils/formatData';
import style from './Date.module.scss';
import PropTypes from 'prop-types';

export const DateEl = ({date}) => (
  <time className={style.date} dateTime={date}>{formatDate(date)}</time>
);

DateEl.propTypes = {
  date: PropTypes.number,
};
