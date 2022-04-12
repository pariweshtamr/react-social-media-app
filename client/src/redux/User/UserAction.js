import { getUserById, getUserByUsername } from '../../api/userAPI'
import { loginSuccess, requestFail, requestPending } from './UserSlice'

export const fetchUserById = (userId) => async (dispatch) => {
  dispatch(requestPending())
  const data = await getUserById(userId)

  if (data) {
    return dispatch(loginSuccess(data))
  }
  dispatch(requestFail(data))
}

export const fetchUserByUsername = (username) => async (dispatch) => {
  dispatch(requestPending())
  const data = await getUserByUsername(username)
  return data
}
