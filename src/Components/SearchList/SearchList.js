import {useLocation} from 'react-router-dom';
import {List} from '../Main/List/List';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {searchRequest} from '../../store/searchReducer/searchSlice';

export const SearchList = () => {
  const token = useSelector(state => state.tokenReducer.token);
  const {posts, status, isLast, search} =
    useSelector(state => state.searchReducer);
  const dispatch = useDispatch();
  const {pathname} = useLocation();

  useEffect(() => {
    if (!pathname.includes('search') || status || !token) return;

    dispatch(searchRequest(search));
  }, [token, status, pathname]);

  return (
    <>
      <List posts={posts} status={status} isLast={isLast} />
    </>
  );
};
