import axios from 'axios'

export const getTimelinePosts = async (id) => {
  try {
    const { data } = await axios.get(`/posts/timeline/${id}`)
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

export const createPost = async (newPost) => {
  try {
    const { data } = await axios.post('/posts', newPost)
    return data
  } catch (error) {
    console.log(error)
    return error?.response?.data
  }
}
