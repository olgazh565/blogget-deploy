import PropTypes from 'prop-types';
import {ReactComponent as ArrowIcon} from './img/arrow.svg';
import {ReactComponent as BestIcon} from './img/best.svg';
import {ReactComponent as HomeIcon} from './img/home.svg';
import {ReactComponent as HotIcon} from './img/hot.svg';
import {ReactComponent as TopIcon} from './img/top.svg';
import {ReactComponent as DeleteIcon} from './img/delete.svg';

const icons = {
  arrow: ArrowIcon,
  best: BestIcon,
  home: HomeIcon,
  hot: HotIcon,
  top: TopIcon,
  delete: DeleteIcon,
};

export const Svg = ({name, ...props}) => {
  const Svg = icons[name];

  return <Svg {...props}/>;
};

Svg.propTypes = {
  name: PropTypes.string,
};
