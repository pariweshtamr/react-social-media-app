import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
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

    loginSuccess: (state, action) => {
      state.isLoading = false
      state.user = action.payload
    },

    loginFail: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    requestFail: (state, action) => {
      state.user = {}
      state.isLoading = false
      state.error = action.payload
    },
  },
})

const { reducer, actions } = userSlice

export const { requestPending, loginSuccess, loginFail, requestFail } = actions

export default reducer
