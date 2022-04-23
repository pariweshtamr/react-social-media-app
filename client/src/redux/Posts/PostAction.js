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
    dispatch(
      getPostsSuccess(
        data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        }), // arrange posts according to date or time
      ),
    )
  } catch (error) {
    dispatch(getPostsFail(data))
  }
}

export const fetchAllUserPosts = (username) => async (dispatch) => {
  dispatch(requestPending())
  const data = await getAllUserPosts(username)
  try {
    dispatch(
      getPostsSuccess(
        data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        }), // arrange posts according to date or time
      ),
    )
  } catch (error) {
    dispatch(getPostsFail(data))
  }
}

export const createPostAction = (newPost) => async (dispatch) => {
  dispatch(requestPending())
  const data = await createPost(newPost)

  if (data?.status === 'success') {
    dispatch(createPostSuccess(data))
  }
}
