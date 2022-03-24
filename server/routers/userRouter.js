import express from 'express'
import { comparePassword, hashPassword } from '../helpers/bcrypt.helper.js'
import {
  createUser,
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
userRouter.patch('/:id', async (req, res) => {
  console.log(req.body)
  if (req.body.userId === req.params.id) {
    const result = updateUserProfile(req.body.userId, req.body)
    if (result?._id) {
      return res.json({
        status: 'success',
        message: 'Your profile has been updated successfully',
      })
    }
    return res.json({
      status: 'error',
      message: 'Unable to update user information. Please try again later.',
    })
  } else {
    return res.json({
      status: 'error',
      message: 'Unable to update user information. Please try again later.',
    })
  }
})

//Update password when logged in
userRouter.post('/:id/password-update', async (req, res) => {
  try {
    const id = req.params.id
    const user = await getUserById(id)
    const { _id, password } = user
    const { currentPassword } = req.body
    console.log(currentPassword, req.body)

    //make sure the current password matches the one in the database
    const passMatched = comparePassword(currentPassword, password)
    if (passMatched) {
      // if matched, then encrypt the new password and store in db
      const hashedPass = hashPassword(req.body.password)
      if (hashedPass) {
        //update user table
        const user = await updateUserProfile(_id, { password: hashedPass })
        if (user._id) {
          res.json({
            status: 'success',
            message: 'Password updated successfully',
          })
          return
        }
      }
    }
    res.json({
      status: 'error',
      message: 'Unable to update password. Please try again later.',
    })
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Error, unable to process your request.',
    })
  }
})

// delete user

// get a user

// follow a user

// unfollow a user
export default userRouter
