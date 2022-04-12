import { getUserById, getUserByUsername, loginUser } from '../../api/userAPI'
import { loginFail, loginSuccess, requestPending } from './UserSlice'

export const fetchUserById = (userId) => async (dispatch) => {
  dispatch(requestPending())
  const data = await getUserById(userId)
  return data
}

export const fetchUserByUsername = (username) => async (dispatch) => {
  dispatch(requestPending())
  const data = await getUserByUsername(username)
  return data
}

export const userLogin = (userCredentials) => async (dispatch) => {
  dispatch(requestPending())

  // call api to login
  const data = await loginUser(userCredentials)
  if (data?.status === 'success') {
    return dispatch(loginSuccess(data.user))
  }

  dispatch(loginFail(data))
}
