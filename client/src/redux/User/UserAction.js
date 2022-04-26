import { getNewAccessJWT, updateAccessJWT } from '../../api/tokenAPI'
import {
  getUserById,
  loginUser,
  registerUser,
  getUser,
  logoutUser,
} from '../../api/userAPI'
import {
  autoLoginPending,
  loginAuto,
  loginFail,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  requestFail,
  requestPending,
} from './UserSlice'

export const fetchUserById = (userId) => async (dispatch) => {
  dispatch(requestPending())
  const data = await getUserById(userId)
  return data
}

export const userRegister = (newUser) => async (dispatch) => {
  dispatch(requestPending())

  // call api
  const data = await registerUser(newUser)
  data?.status === 'success'
    ? dispatch(registerSuccess(data))
    : dispatch(requestFail(data))
}

const setJWTinBrowserMemory = ({ accessJWT, refreshJWT }) => {
  window.sessionStorage.setItem('accessJWT', accessJWT)
  window.localStorage.setItem('refreshJWT', refreshJWT)
}

export const userLogin = (userCredentials) => async (dispatch) => {
  dispatch(requestPending())

  // call api to login
  const data = await loginUser(userCredentials)
  if (data?.status === 'success') {
    setJWTinBrowserMemory(data.jwts)
    return dispatch(loginSuccess(data.user))
  }

  dispatch(loginFail(data))
}

export const autoLogin = () => async (dispatch) => {
  dispatch(autoLoginPending(true))
  const accessJWT = window.sessionStorage.getItem('accessJWT')
  const refreshJWT = window.localStorage.getItem('refreshJWT')

  //1. accessJWT exists
  if (accessJWT) {
    dispatch(loginAuto())
    return
  }

  //2. accessJWT does not exist but refreshJWT exists
  if (!accessJWT && refreshJWT) {
    // Call api to get new accessJWT from existing refreshJWT
    const result = await getNewAccessJWT()
    if (result?.accessJWT) {
      window.sessionStorage.setItem('accessJWT', result.accessJWT)
      return dispatch(loginAuto())
    }

    dispatch(userLogout())
  }
}

export const fetchUserDetails = () => async (dispatch) => {
  dispatch(requestPending())
  const data = await getUser()
  console.log(data)
  if (data?.message === 'jwt expired') {
    // request for new accessJWT
    const token = await updateAccessJWT()
    if (token) {
      return dispatch(fetchUserDetails())
    } else {
      dispatch(userLogout())
    }
  }

  if (data?.user) {
    return dispatch(loginSuccess(data.user))
  }
  dispatch(requestFail(data))
}

export const userLogout = () => async (dispatch) => {
  const accessJWT = window.sessionStorage.getItem('accessJWT')
  const refreshJWT = window.localStorage.getItem('refreshJWT')

  await logoutUser({ accessJWT, refreshJWT })

  window.sessionStorage.removeItem('accessJWT')
  window.localStorage.removeItem('refreshJWT')

  dispatch(logoutSuccess())
}
