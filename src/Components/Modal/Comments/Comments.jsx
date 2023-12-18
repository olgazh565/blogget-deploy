import Markdown from 'markdown-to-jsx';
import {Text} from '../../../UI/Text/Text';
import {DateEl} from '../../Main/List/Post/Date/Date';
import style from './Comments.module.scss';
import PropTypes from 'prop-types';

export const Comments = ({comments}) => {
  if (!comments.length) {
    return (
      <p className={style.list}>Нет комментариев</p>
    );
  }

  return (
    <ul className={style.list}>
      {comments.map(comment => {
        if (!comment.author || comment.author === '[deleted]') return;
        return (
          <li className={style.item} key={comment.id}>
            <Text
              As='h3'
              className={style.author}
              size={18}
              tsize={22}>
              {comment.author}
            </Text>
            <Text
              As='div'
              className={style.comment}
              size={14}
              tsize={18}
            >
              <Markdown options={{
                overrides: {
                  a: {
                    props: {
                      target: '_blank'
                    },
                  },
                },
              }}>
                {comment.body}
              </Markdown>
            </Text>
            <DateEl date={comment.created} />
          </li>
        );
      })}
    </ul>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};
