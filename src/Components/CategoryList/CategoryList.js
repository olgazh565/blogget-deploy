import {useParams} from 'react-router-dom';
import {usePostsData} from '../../hooks/usePostsData';
import {List} from '../Main/List/List';

export const CategoryList = () => {
  const {page} = useParams();
  const [posts, status, isLast] = usePostsData(page);

  return (
    <>
      <List posts={posts} status={status} isLast={isLast} />
    </>
  );
};
