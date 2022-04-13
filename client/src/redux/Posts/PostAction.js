import { getAllUserPosts, getTimelinePosts } from '../../api/postAPI'
import { getPostsFail, getPostsSuccess, requestPending } from './PostSlice'

export const fetchTimelinePosts = (id) => async (dispatch) => {
  dispatch(requestPending())
  const data = await getTimelinePosts(id)
  try {
    dispatch(getPostsSuccess(data))
  } catch (error) {
    dispatch(getPostsFail(data))
  }
}

export const fetchAllUserPosts = (username) => async (dispatch) => {
  dispatch(requestPending())
  const data = await getAllUserPosts(username)
  try {
    dispatch(getPostsSuccess(data))
  } catch (error) {
    dispatch(getPostsFail(data))
  }
}
