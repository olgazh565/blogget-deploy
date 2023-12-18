import {Header} from './Components/Header/Header';
import {Main} from './Components/Main/Main';
import {useDispatch, useSelector} from 'react-redux';
import {updateToken} from './store/tokenReducer/tokenAction';
import {getToken} from './api/token';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import {resetSearchResult} from './store/searchReducer/searchSlice';

const App = () => {
  const search = useSelector(state => state.searchReducer.search);
  const {pathname} = useLocation();
  const dispatch = useDispatch();

  const token = getToken();

  useEffect(() => {
    dispatch(updateToken(token));
  }, [token]);

  useEffect(() => {
    if (search && !pathname.includes('search')) {
      localStorage.removeItem('search');
      dispatch(resetSearchResult());
    }
  }, [search, pathname]);

  return (
    <Routes>
      <Route
        path='/*'
        element={
          <>
            <Header />
            <Main />
          </>
        }
      />
      <Route path='/auth' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default App;

