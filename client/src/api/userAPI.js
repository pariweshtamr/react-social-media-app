import axios from 'axios'

export const getUser = async (userId) => {
  try {
    const { data } = await axios.get(`users/${userId}`)
    console.log(data)
    return data
  } catch (error) {
    return error?.message?.data || { status: 'error', message: error.message }
  }
}
