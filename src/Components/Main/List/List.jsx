import style from './List.module.scss';
import PropTypes from 'prop-types';
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet, Route, Routes, useLocation, useParams} from 'react-router-dom';
import {searchRequest} from '../../../store/searchReducer/searchSlice';
import {fetchPosts} from '../../../store/postsReducer/postsSlice';
import {Loader} from '../../../UI/Loader/Loader';
import {Modal} from '../../Modal/Modal';
import {Post} from './Post/Post';

export const List = ({posts, status, isLast}) => {
  const {page} = useParams();
  const {pathname} = useLocation();
  const search = useSelector(state => state.searchReducer.search);
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!endList.current || isLast) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (page) {
          dispatch(fetchPosts(page));
        } else if (search) {
          dispatch(searchRequest(search));
        }
      }
    }, {
      rootMargin: '50px',
    });

    observer.observe(endList.current);

    return () => {
      endList.current && observer.unobserve(endList.current);
    };
  }, [endList.current, isLast, status, page, search]);

  return (
    <>
      {
        (pathname.includes('search') && status === 'loaded') &&
        (
          <p className={style.searchText}>
            По вашему запросу &quot;
            <b>
              {search}
            </b>
            &quot;
            {
              posts.length !== 0 ? 'найдено:' : 'ничего не найдено'
            }
          </p>
        )
      }
      <ul className={style.list}>
        {status === 'error' && 'Ошибка'}
        {
          (posts.length !== 0) ? posts.map(({data}) => (
            <Post key={data.id + Math.random().toFixed(3)} postData={data} />
          )) :
            ((status === 'loaded' && !pathname.includes('search')) &&
              <p><b>В данной категории постов нет</b></p>)
        }
        {status === 'loaded' &&
          (
            <li className={style.wrapper}>
              {
                (posts.length >= 30 && !isLast) ?
                  <button
                    className={style.btn}
                    onClick={() => {
                      if (page) {
                        dispatch(fetchPosts(page));
                      } else if (search) {
                        dispatch(searchRequest(search));
                      }
                    }}
                  >
                    Загрузить еще
                  </button> :
                  <p ref={endList} className={style.end} />
              }
            </li>
          )
        }
        {status === 'loading' &&
          (
            <li className={style.loader}>
              <Loader />
            </li>
          )
        }
      </ul>
      <Routes>
        <Route path='post/:id' element={<Modal />} />
      </Routes>
      <Outlet />
    </>
  );
};

List.propTypes = {
  posts: PropTypes.array,
  status: PropTypes.string,
  isLast: PropTypes.bool,
};
