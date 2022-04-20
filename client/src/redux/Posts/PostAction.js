import {
  createPost,
  createPostWithImg,
  getAllUserPosts,
  getTimelinePosts,
} from '../../api/postAPI'
import {
  createPostSuccess,
  getPostsFail,
  getPostsSuccess,
  requestPending,
} from './PostSlice'

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

export const createPostAction = (newPost) => async (dispatch) => {
  dispatch(requestPending())
  const data = await createPost(newPost)

  if (data?.status === 'success') {
    dispatch(createPostSuccess(data))
    dispatch(getPostsSuccess())
  }
}

export const createPostWithImgAction = (newPost) => async (dispatch) => {
  dispatch(requestPending())
  const data = await createPostWithImg(newPost)

  if (data?.status === 'success') {
    dispatch(createPostSuccess(data))
  }
}
