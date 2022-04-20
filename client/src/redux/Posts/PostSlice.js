import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  isLoading: false,
  error: false,
  postResponse: {},
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true
    },

    getPostsSuccess: (state, action) => {
      state.isLoading = false
      state.posts = action.payload
    },

    getPostsFail: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    createPostSuccess: (state, action) => {
      state.isLoading = false
      state.postResponse = action.payload
    },
  },
})

const { reducer, actions } = postSlice

export const {
  requestPending,
  getPostsSuccess,
  getPostsFail,
  createPostSuccess,
} = actions

export default reducer
