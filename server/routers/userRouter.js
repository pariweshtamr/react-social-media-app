import express from 'express'
import { comparePassword, hashPassword } from '../helpers/bcrypt.helper.js'
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
} from '../models/User/User.model.js'
import User from '../models/User/User.schema.js'

const userRouter = express.Router()

// REGISTER
userRouter.post('/register', async (req, res) => {
  try {
    // encrypt password
    const hashPass = hashPassword(req.body.password)

    if (hashPass) {
      req.body.password = hashPass

      const user = await createUser(req.body)
      // res.status(200).json(user)

      return res.json({
        status: 'success',
        message:
          'New user has been successfully created. You will be navigated to the login page shortly...',
      })
    }
    res.json({
      status: 'error',
      message: 'Unable to create new user. Please try again later',
    })
  } catch (error) {
    console.log(error.message)
    if (error.message.includes('E11000 duplicate key error collection')) {
      msg = 'Error, an account already exists for this email address'
    }
    res.json({
      status: 'error',
      message: 'Unable to create new user',
    })
  }
})

// LOGIN
userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await getUserByEmail(email)

    if (user?._id) {
      // Check if password is valid or not

      const isPasswordMatch = comparePassword(password, user.password)

      if (isPasswordMatch) {
        user.password = undefined
        return res.json({
          status: 'success',
          message: 'Login Successful',
          user,
        })
      } else {
        res.status(400).json('Wrong Password')
      }
    }
    res.status(401).json({
      status: 'error',
      messsage: 'Unauthorized. User not found.',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'error',
      message: 'Error, unable to login at the moment. Please try again later',
    })
  }
})

// update user
userRouter.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        req.body.password = hashPassword(req.body.password)
      } catch (error) {
        return res.status(500).json(error)
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      })
      res.status(200).json('Account has been updated')
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json('You can only update your account!')
  }
})

// delete user
userRouter.delete('/:id', async (req, res) => {
  const user = await getUserById(req.params.id)

  req.user = user
  const { _id } = req.user

  if (_id === req.params.id || !user.isAdmin) {
    try {
      const user = await deleteUser(_id)
      res.status(200).json('Account has been deleted')
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json('You can only delete your account!')
  }
})

// get a user
userRouter.get('/', async (req, res) => {
  const userId = req.query.userId
  const username = req.query.username
  try {
    const user = userId
      ? await getUserById(userId)
      : await getUserByUsername(username)
    const { password, isAdmin, updatedAt, ...other } = user._doc //.doc carries the whole object (user)
    res.status(200).json(other)
  } catch (error) {
    res.status(500).json(error)
  }
})

// get friends or following users
userRouter.get('/friends/:userId', async (req, res) => {
  try {
    const user = await getUserById(req.params.userId)
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return getUserById(friendId)
      }),
    )

    let friendList = []

    friends.map((friend) => {
      const { _id, username, profilePicture } = friend
      friendList.push({ _id, username, profilePicture })
    })
    res.status(200).json(friendList)
  } catch (error) {
    res.status(500).json(error)
  }
})

// follow a user
userRouter.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await getUserById(req.params.id)
      const currentUser = await getUserById(req.body.userId)

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } })
        await currentUser.updateOne({ $push: { following: req.params.id } })
        res.status(200).json('You are now following this user')
      } else {
        res.status(403).json('You are already following this user')
      }
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json('You cannot follow yourself')
  }
})

// unfollow a user

userRouter.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await getUserById(req.params.id)
      const currentUser = await getUserById(req.body.userId)

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } })
        await currentUser.updateOne({ $pull: { following: req.body.userId } })
        res.status(200).json('User has been unfollowed')
      } else {
        res.status(403).json('You are not following this user')
      }
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json('You cannot unfollow yourself')
  }
})

export default userRouter
