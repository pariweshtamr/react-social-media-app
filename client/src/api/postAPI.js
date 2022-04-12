import axios from 'axios'

export const getTimelinePosts = async () => {
  try {
    const { data } = await axios.get('/posts/timeline/62526c796664540e248e39a7')
    return data
  } catch (error) {
    return error?.message?.data || { status: 'error', message: error.message }
  }
}

export const getAllUserPosts = async (username) => {
  try {
    const { data } = await axios.get(`/posts/profile/${username}`)
    return data
  } catch (error) {
    return error?.message?.data || { status: 'error', message: error.message }
  }
}
