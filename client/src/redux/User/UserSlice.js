import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  userRegisterResponse: {},
  isLoggedIn: JSON.parse(localStorage.getItem('authState'))?.isLoggedIn
    ? JSON.parse(localStorage.getItem('authState')).isLoggedIn
    : false,
  isLoading: false,
  isAutoLoginPending: false,
  error: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true
    },

    registerSuccess: (state, action) => {
      state.isLoading = false
      state.userRegisterResponse = action.payload || {}
    },

    loginSuccess: (state, action) => {
      state.isLoading = false
      state.isLoggedIn = true
      state.user = action.payload

      localStorage.setItem('authState', JSON.stringify(action.payload))
    },

    loginAuto: (state) => {
      state.isAutoLoginPending = false
      state.isLoggedIn = true
      state.user = JSON.parse(localStorage.getItem('authState'))
    },

    autoLoginPending: (state, action) => {
      state.isAutoLoginPending = action.payload
    },
    logoutSuccess: (state) => {
      state.user = {}
      state.isLoggedIn = false
      state.isAutoLoginPending = false
      localStorage.clear()
    },

    loginFail: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    followUser: (state, action) => {
      state.user = {
        ...state.user,
        following: [...state.user.following, action.payload],
      }
    },

    unfollowUser: (state, action) => {
      state.user = {
        ...state.user,
        following: state.user.following.filter((f) => f !== action.payload),
      }
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
  loginAuto,
  loginFail,
  logoutSuccess,
  autoLoginPending,
  requestFail,
  followUser,
  unfollowUser,
} = actions

export default reducer
