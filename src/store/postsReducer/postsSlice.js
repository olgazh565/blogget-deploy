import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  posts: [],
  error: '',
  after: '',
  isLast: false,
  page: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPosts(state, action) {
      state.status = 'loading';
      state.error = '';
      state.page = action.payload;
    },
    fetchPostsSuccess(state, action) {
      state.status = 'loaded';
      state.posts = [...state.posts, ...action.payload.children];
      state.error = '';
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
    },
    fetchPostsError(state, action) {
      state.status = 'error';
      state.error = action.error;
    },
    resetPostsState(state) {
      state.posts = [];
      state.error = '';
      state.status = '';
      state.after = '';
      state.isLast = false;
    },
  },
});

export default postsSlice.reducer;

export const {
  fetchPosts,
  fetchPostsSuccess,
  fetchPostsError,
  resetPostsState,
} = postsSlice.actions;
