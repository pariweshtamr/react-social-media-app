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
