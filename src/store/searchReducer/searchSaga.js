import {takeLatest, put, select} from 'redux-saga/effects';
import {URL_API} from '../../api/const';
import axios from 'axios';
import {
  searchRequest,
  searchRequestError,
  searchRequestSuccess
} from './searchSlice';

function* fetchSearch({payload: search}) {
  const token = yield select(state => state.tokenReducer.token);
  const {after, isLast} = yield select(state => state.searchReducer);

  if (!token || isLast || !search) return;

  try {
    const request = yield axios(
      `${URL_API}/search?q=${search}&limit=10&${after ? `after=${after}` : ''}`,
      {
        headers: {
          Authorization: `bearer ${token}`
        }
      });
    yield put(searchRequestSuccess(request.data.data));
  } catch (e) {
    yield put(searchRequestError(e.message));
  }
}

export default function* watchSearch() {
  yield takeLatest(searchRequest, fetchSearch);
}


