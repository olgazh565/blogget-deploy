import {all} from 'redux-saga/effects';
import watchPosts from './postsReducer/postsSaga';
import watchSearch from './searchReducer/searchSaga';
import watchPostComments from './postCommentsReducer/postCommentsSaga';

export default function* rootSaga() {
  yield all([
    watchPosts(),
    watchSearch(),
    watchPostComments(),
  ]);
}
