import { getPosts } from '../../api/postAPI'
import { getPostsFail, getPostsSuccess, requestPending } from './PostSlice'

export const fetchPosts = () => async (dispatch) => {
  dispatch(requestPending())
  const data = await getPosts()
  try {
    dispatch(getPostsSuccess(data))
  } catch (error) {
    dispatch(getPostsFail(data))
  }
}
