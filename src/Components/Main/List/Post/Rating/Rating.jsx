import {Text} from '../../../../../UI/Text/Text';
import style from './Rating.module.scss';
import PropTypes from 'prop-types';

export const Rating = ({ups}) => (
  <div className={style.rating}>
    <button className={style.up} aria-label='Увеличить рейтинг' />
    <Text
      As='p'
      className={style.ups}
      size={12}
      tsize={16}
      color='grey99'
      bold>
      {ups}
    </Text>
    <button className={style.down} aria-label='Понизить рейтинг' />
  </div>
);

Rating.propTypes = {
  ups: PropTypes.number,
};
