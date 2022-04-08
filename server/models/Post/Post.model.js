import Post from './Post.schema.js'

// REGISTER USER

export const createPost = (newPost) => {
  try {
    const post = Post(newPost).save()
    return post
  } catch (error) {
    console.log(error)
  }
}

export const getPostById = (id) => {
  return Post.findById(id)
}
