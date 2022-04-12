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
