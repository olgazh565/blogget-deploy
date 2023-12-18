import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {URL_API} from '../../api/const';
import {deleteToken} from '../tokenReducer/tokenAction';
import {fetchPosts, fetchPostsError, fetchPostsSuccess} from './postsSlice';

function* fetchPostsSaga({payload: page}) {
  const token = yield select(state => state.tokenReducer.token);
  const {after, isLast} = yield select(state => state.postsReducer);

  if (!token || isLast || !page) return;

  try {
    const response = yield axios(
      `${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      }
    );
    const {data} = response.data;
    yield put(fetchPostsSuccess(data));
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put(deleteToken());
    }

    yield put(fetchPostsError(e.message));
  }
}

export default function* watchPosts() {
  yield takeLatest(fetchPosts, fetchPostsSaga);
}
