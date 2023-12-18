import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  posts: [],
  error: '',
  after: '',
  isLast: false,
  search: localStorage.search || '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchRequest(state, {payload: search}) {
      state.search = search;
      state.status = 'loading';
      state.error = '';
    },
    searchRequestSuccess(state, action) {
      state.status = 'loaded',
      state.posts = [...state.posts, ...action.payload.children];
      state.error = '';
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
    },
    searchRequestError(state, action) {
      state.status = 'error';
      state.error = action.error;
    },
    resetSearchResult(state) {
      state.status = '';
      state.posts = [];
      state.error = '';
      state.after = '';
      state.isLast = false;
      state.search = '';
    }
  }
});

export default searchSlice.reducer;

export const {
  searchRequest,
  searchRequestSuccess,
  searchRequestError,
  resetSearchResult,
} = searchSlice.actions;

