import style from './Modal.module.scss';
import PropTypes from 'prop-types';
import {ReactComponent as CloseIcon} from './img/close.svg';
import Markdown from 'markdown-to-jsx';
import {createPortal} from 'react-dom';
import {useEffect, useRef, useState} from 'react';
import {useCommentsData} from '../../hooks/useCommentsData';
import {FormComment} from './FormComment/FormComment';
import {Comments} from './Comments/Comments';
import {Loader} from '../../UI/Loader/Loader';
import {useNavigate, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

export const Modal = () => {
  const {id, page} = useParams();
  const navigate = useNavigate();
  const [post, comments, status] = useCommentsData(id);
  const [showCommentsForm, setShowCommentsForm] = useState(false);
  const [showCommentsBtn, setShowCommentsBtn] = useState(true);
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const search = useSelector(state => state.searchReducer.search);

  const handleCloseModal = e => {
    const target = e.target;

    if (target === overlayRef.current ||
      closeBtnRef.current?.contains(target)) {
      if (page) {
        navigate(`/category/${page}`);
      } else if (search) {
        navigate(`/search?q=${search}`);
      }
    }
  };

  const handleShowForm = () => {
    setShowCommentsForm(true);
    setShowCommentsBtn(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleCloseModal);

    return () => {
      document.removeEventListener('click', handleCloseModal);
    };
  }, []);

  const handleEscKey = (e) => {
    if (id) {
      if (e.key === 'Escape') {
        if (page) {
          navigate(`/category/${page}`);
        } else if (search) {
          navigate(`/search?q=${search}`);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal} >

        {status === 'loading' && <Loader />}
        {status === 'error' && 'Ошибка'}
        {status === 'loaded' && (
          <>
            <h2 className={style.title}>
              <a
                className={style.linkPost}
                href={post.url}
                target='_blank'
                rel="noreferrer"
              >{post && post.title}
              </a>
            </h2>
            <div className={style.content}>
              <Markdown options={{
                overrides: {
                  a: {
                    props: {
                      target: '_blank'
                    },
                  },
                },
              }}>
                {post.selftext}
              </Markdown>
            </div>

            <p className={style.author}>{post && post.author}</p>

            {showCommentsBtn &&
              <button
                className={style.btn}
                onClick={handleShowForm}
              >
                Написать комментарий
              </button>
            }

            <Comments comments={comments} />

            {showCommentsForm && <FormComment />}

            <button className={style.close} ref={closeBtnRef}>
              <CloseIcon />
            </button>
          </>
        )}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

Modal.propTypes = {
  id: PropTypes.string,
  closeModal: PropTypes.func,
};
