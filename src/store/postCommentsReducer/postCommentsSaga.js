import axios from 'axios';
import {select, takeLatest, put} from 'redux-saga/effects';
import {URL_API} from '../../api/const';
import {
  fetchPostComments,
  fetchPostCommentsError,
  fetchPostCommentsSuccess
} from './postCommentsSlice';

function* fetchPostCommentsSaga({payload: id}) {
  const token = yield select(state => state.tokenReducer.token);

  if (!token) return;

  try {
    const response = yield axios(`${URL_API}/comments/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    const [postData, commentsData] = response.data;
    const post = postData.data.children[0].data;
    const comments = commentsData.data.children.map(item => item.data);

    yield put(fetchPostCommentsSuccess({post, comments}));
  } catch (e) {
    yield put(fetchPostCommentsError(e));
  }
}

export default function* watchPostComments() {
  yield takeLatest(fetchPostComments, fetchPostCommentsSaga);
}
