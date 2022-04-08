import express from 'express'
import { createPost, getPostById } from '../models/Post/Post.model.js'

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

// get timeline posts

export default postRouter
