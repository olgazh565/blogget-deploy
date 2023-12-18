import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  post: {},
  comments: [],
  error: '',
};

export const postCommentsSlice = createSlice({
  name: 'postComments',
  initialState,
  reducers: {
    fetchPostComments(state, action) {
      state.status = 'loading';
      state.error = '';
      action.payload;
    },
    fetchPostCommentsSuccess(state, action) {
      state.status = 'loaded';
      state.error = '';
      state.post = action.payload.post;
      state.comments = action.payload.comments;
    },
    fetchPostCommentsError(state, action) {
      state.status = 'error';
      state.error = action.error.message;
    }
  },
});

export default postCommentsSlice.reducer;

export const {
  fetchPostComments,
  fetchPostCommentsSuccess,
  fetchPostCommentsError
} = postCommentsSlice.actions;
