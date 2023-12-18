import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPosts} from '../store/postsReducer/postsSlice';

export const usePostsData = (page) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.tokenReducer.token);
  const {posts, status, isLast} = useSelector(state => state.postsReducer);

  useEffect(() => {
    if (!page || !token || status) return;

    dispatch(fetchPosts(page));
  }, [token, page, status]);

  return [posts, status, isLast];
};
