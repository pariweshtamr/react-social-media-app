import { getUser } from '../../api/userAPI'
import { loginSuccess, requestFail, requestPending } from './UserSlice'

export const fetchUser = (userId) => async (dispatch) => {
  dispatch(requestPending())
  const data = await getUser(userId)
  console.log(data)

  if (data) {
    return dispatch(loginSuccess(data))
  }
  dispatch(requestFail(data))
}
