import style from './Content.module.scss';
import PropTypes from 'prop-types';
import {Text} from '../../../../../UI/Text/Text';
import {Link, useParams} from 'react-router-dom';

export const Content = ({title, author, id}) => {
  const {page} = useParams();

  return (
    <div className={style.content}>
      <Text
        As='h1'
        className={style.title}
        title={title}
        size={18}
        tsize={24}
        dsize={28}
      >
        <Link
          className={style.linkPost}
          to={page ?
            `/category/${page}/post/${id}` :
            `/search/post/${id}`
          }
        >
          <Text
            bold
            size={14}
            tsize={22}
            title={title}
            className={style.linkPost}
          >
            {title}
          </Text>
        </Link>
      </Text>
      <Text
        As='a'
        size={12}
        tsize={14}
        color='orange'
        className={style.linkAuthor}
        href='#author'>
        {author}
      </Text>
    </div>
  );
};

Content.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  id: PropTypes.string,
};
