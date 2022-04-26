import { createPost, createPostWithImg } from '../../api/postAPI'
import { createPostSuccess, requestPending } from './PostSlice'

export const createPostAction = (newPost) => async (dispatch) => {
  dispatch(requestPending())
  const data = await createPost(newPost)

  if (data?.status === 'success') {
    dispatch(createPostSuccess(data))
  }
}
export const createPostWithImgAction = (newPost) => async (dispatch) => {
  dispatch(requestPending())
  const data = await createPostWithImg(newPost)

  if (data?.status === 'success') {
    dispatch(createPostSuccess(data))
  }
}
