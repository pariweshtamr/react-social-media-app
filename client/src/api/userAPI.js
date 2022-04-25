import axios from 'axios'

export const getUserById = async (userId) => {
  try {
    const { data } = await axios.get(`/users?userId=${userId}`)
    return data
  } catch (error) {
    return error?.message?.data || { status: 'error', message: error.message }
  }
}

export const getUserByUsername = async (username) => {
  try {
    const { data } = await axios.get(`/users?username=${username}`)
    return data
  } catch (error) {
    return error?.message?.data || { status: 'error', message: error.message }
  }
}

export const getUser = async () => {
  try {
    const { data } = await axios.get('/users/auth', {
      headers: {
        authorization: window.sessionStorage.getItem('accessJWT'),
      },
    })
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    return error?.response?.data
  }
}
export const loginUser = async (userCredentials) => {
  try {
    const { data } = await axios.post('/users/login', userCredentials)
    return data
  } catch (error) {
    return {
      status: 'error',
      message: 'Invalid login details',
    }
  }
}

export const registerUser = async (newUser) => {
  try {
    const { data } = await axios.post('/users/register', newUser)
    return data
  } catch (error) {
    console.log(error)
    return {
      status: 'error',
      message: error.message,
    }
  }
}

export const logoutUser = async (tokens) => {
  try {
    const { data } = await axios.post('/users/logout', tokens)
    return data
  } catch (error) {
    return {
      status: 'error',
      message: 'Error, unable to process your request. Please try again later.',
    }
  }
}
