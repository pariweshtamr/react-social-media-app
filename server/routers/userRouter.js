import express, { Router } from 'express'
import { comparePassword, hashPassword } from '../helpers/bcrypt.helper.js'
import {
  createUser,
  deleteUser,
  getUserById,
  getUserByUsername,
} from '../models/User.model.js'

import { updateUserProfile } from '../models/User.model.js'

const userRouter = express.Router()

// REGISTER
userRouter.post('/register', async (req, res) => {
  try {
    // encrypt password
    const hashPass = hashPassword(req.body.password)

    if (hashPass) {
      req.body.password = hashPass

      const user = await createUser(req.body)
      res.status(200).json(user)
    }
  } catch (error) {
    console.log(error.message)
  }
})

// LOGIN
userRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await getUserByUsername(username)

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
  const user = await getUserById(req.params.id)

  req.user = user
  const { _id } = req.user

  if (_id === req.params.id || !user.isAdmin) {
    console.log(req.body)
    if (req.body.password) {
      try {
        req.body.password = hashPassword(req.body.password)
      } catch (error) {
        return res.status(500).json(error)
      }
    }
    try {
      const updateUser = await updateUserProfile(_id, { $set: req.body })
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
userRouter.get('/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id)
    const { password, isAdmin, updatedAt, ...other } = user._doc //.doc carries the whole object (user)
    res.status(200).json(other)
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
        await currentUser.updateOne({ $push: { following: req.body.userId } })
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

export default userRouter
