import {tokenReducer} from './tokenReducer/tokenReducer';
import {tokenMiddleware} from './tokenReducer/tokenAction';
import {commentReducer} from './commentReducer/commentReducer';
import {authReducer} from './authReducer/authReducer';
import searchReducer from './searchReducer/searchSlice';
import postsReducer from './postsReducer/postsSlice';
import postCommentsReducer from './postCommentsReducer/postCommentsSlice';
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    tokenReducer,
    commentReducer,
    authReducer,
    postsReducer,
    postCommentsReducer,
    searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleware, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

