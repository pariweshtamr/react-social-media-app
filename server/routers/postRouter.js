import express from 'express'
import { createPost, getPostById } from '../models/Post/Post.model.js'
import Post from '../models/Post/Post.schema.js'
import { getUserById } from '../models/User/User.model.js'
import User from '../models/User/User.schema.js'
import multer from 'multer'

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

// CONFIGURE MULTER FOR VALIDATION AND UPLOAD DESTINATION
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error = null
    cb(error, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  },
})

const upload = multer({ storage })

postRouter.post('/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('File has been uploaded successfully.')
  } catch (error) {
    console.log(error)
  }
})

postRouter.post('/', upload.array('images', 10), async (req, res) => {
  try {
    // FILE ZONE
    console.log(req.body)

    const files = req.files
    console.log(files)
    const images = []

    const basePath = `${req.protocol}://${req.get('host')}/images/posts`

    files.map((file) => {
      const imgFullPath = basePath + file.filename
      console.log(imgFullPath)
      images.push(imgFullPath)
    })

    const slug = slugify(req.body.title, { lower: true })
    const post = await createPost({ ...req.body, slug, images })
    // res.status(200).json(post)

    post?._id
      ? res.json({
          status: 'success',
          message: 'New post has been successfully posted',
        })
      : res.json({
          status: 'error',
          message: 'Unable to post. Please try again later.',
        })
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
postRouter.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await getUserById(req.params.userId)
    // add all posts of current user to postArray

    const userPosts = await Post.find({ userId: currentUser._id })

    // If we are using any loop we should use Promise all. Otherwise it will not fetch all posts if we use await here
    const followedPosts = await Promise.all(
      currentUser.following.map((followingId) => {
        return Post.find({ userId: followingId })
      }),
    )
    res.status(200).json(userPosts.concat(...followedPosts))
  } catch (error) {
    res.status(500).json(error)
  }
})

// get user's all posts
postRouter.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    const post = await Post.find({ userId: user._id })
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
})

export default postRouter
