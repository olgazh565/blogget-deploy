import classNames from 'classnames';
import style from './Text.module.scss';
import PropTypes from 'prop-types';

export const Text = prop => {
  const {
    As = 'span',
    color = 'black',
    size,
    tsize,
    dsize,
    className,
    children,
    href,
    center,
    bold,
    medium,
    onClick,
  } = prop;

  const classes = classNames(
    className,
    style[color],
    {[style.center]: center},
    {[style.bold]: bold},
    {[style.medium]: medium},
    {[style[`fs${size}`]]: size},
    {[style[`fst${tsize}`]]: tsize},
    {[style[`fsd${dsize}`]]: dsize}
  );

  return (
    <As
      className={classes}
      href={href}
      onClick={onClick}>
      {children}
    </As>
  );
};

Text.propTypes = {
  onClick: PropTypes.func,
  As: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  tsize: PropTypes.number,
  dsize: PropTypes.number,
  className: PropTypes.string,
  center: PropTypes.bool,
  bold: PropTypes.bool,
  medium: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
    PropTypes.node,
  ]),
};
