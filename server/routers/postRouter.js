import express from 'express'
import { createPost, getPostById } from '../models/Post/Post.model.js'
import Post from '../models/Post/Post.schema.js'
import { getUserById } from '../models/User/User.model.js'

const postRouter = express.Router()

// create a post
postRouter.post('/', async (req, res) => {
  try {
    const post = await createPost(req.body)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
})

// update a post
postRouter.put('/:id', async (req, res) => {
  try {
    const post = await getPostById(req.params.id)

    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body })
      res.status(200).json('The post has been updated')
    } else {
      res.status(403).json('You are only able to update your posts')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// delete a post
postRouter.delete('/:id', async (req, res) => {
  try {
    const post = await getPostById(req.params.id)

    if (post.userId === req.body.userId) {
      await post.deleteOne()
      res.status(200).json('The post has been deleted')
    } else {
      res.status(403).json('You are only able to delete your posts')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// like a post
postRouter.put('/:id/like', async (req, res) => {
  try {
    const post = await getPostById(req.params.id)

    // check whether the posts like array includes the user
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } })
      res.status(200).json('You liked this post')
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      res.status(200).json('You have unliked this post')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// get a post
postRouter.get('/:id', async (req, res) => {
  try {
    const post = await getPostById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
})

// get timeline posts
postRouter.get('/timeline/all', async (req, res) => {
  try {
    const currentUser = await getUserById(req.body.userId)
    // add all posts of current user to postArray

    const userPosts = await Post.find({ userId: currentUser._id })

    // If we are using any loop we should use Promise all. Otherwise it will not fetch all posts if we use await here
    const followedPosts = await Promise.all(
      currentUser.following.map((followingId) => {
        return Post.find({ userId: followingId })
      }),
    )
    res.json(userPosts.concat(...followedPosts))
  } catch (error) {
    res.status(500).json(error)
  }
})

export default postRouter
