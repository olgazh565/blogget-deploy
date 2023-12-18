import style from './Image.module.scss';
import PropTypes from 'prop-types';
import notphoto from './img/notphoto.jpg';
import {useState} from 'react';

export const Image = ({title, thumbnail}) => {
  const [imgSrc, setImgSrc] = useState(thumbnail);

  return (
    <img
      className={style.img}
      src={thumbnail.includes('http') ? imgSrc : notphoto}
      onError={() => setImgSrc(notphoto)}
      alt={title}
    />
  );
};

Image.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
};
