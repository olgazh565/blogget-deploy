import {Svg} from '../../../../../UI/Svg/Svg.jsx';
import style from './DeleteBtn.module.scss';

export const DeleteBtn = () => (
  <button className={style.delete}>
    <Svg name='delete'/>
  </button>
);

