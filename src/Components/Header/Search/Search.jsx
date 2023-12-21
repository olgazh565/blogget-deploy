import {useDispatch, useSelector} from 'react-redux';
import style from './Search.module.scss';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ReactComponent as SearchIcon} from './img/search.svg';
import {
  resetSearchResult,
  searchRequest
} from '../../../store/searchReducer/searchSlice';

export const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const searchStore = useSelector(state => state.searchReducer.search);
  const token = useSelector(state => state.tokenReducer.token);

  const handleSubmit = e => {
    e.preventDefault();
    if (!token) alert('Для продолжения работы необходимо авторизоваться');
    if (!search.length || !token) return;

    if (searchStore) dispatch(resetSearchResult());

    if (search !== searchStore) {
      dispatch(searchRequest(search));
      navigate(`/search?q=${search}`);
      localStorage.setItem('search', search);
      setSearch('');
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        className={style.search}
        type='search'
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      <button className={style.button} type='submit'>
        <SearchIcon className={style.svg} />
      </button>
    </form>
  );
};
