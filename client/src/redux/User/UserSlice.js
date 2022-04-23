import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  userRegisterResponse: {},
  isLoggedIn: false,
  isLoading: false,
  error: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true
    },

    getFriendsSuccess: (state, action) => {
      state.isLoading = false
      state.user.following = action.payload
    },

    registerSuccess: (state, action) => {
      state.isLoading = false
      state.userRegisterResponse = action.payload || {}
    },

    loginSuccess: (state, action) => {
      state.isLoading = false
      state.isLoggedIn = true
      state.user = action.payload
    },

    loginFail: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    requestFail: (state, action) => {
      state.user = {}
      state.friends = []
      state.isLoading = false
      state.error = action.payload
    },
  },
})

const { reducer, actions } = userSlice

export const {
  requestPending,
  getFriendsSuccess,
  registerSuccess,
  loginSuccess,
  loginFail,
  requestFail,
} = actions

export default reducer
