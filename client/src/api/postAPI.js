import axios from 'axios'

export const getPosts = async () => {
  try {
    const { data } = await axios.get('posts/timeline/62526c796664540e248e39a7')
    console.log(data)
    return data
  } catch (error) {
    return error?.message?.data || { status: 'error', message: error.message }
  }
}
