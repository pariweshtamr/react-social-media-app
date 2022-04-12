import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/User/UserSlice'
import postReducer from './redux/Posts/PostSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
})

export default store
