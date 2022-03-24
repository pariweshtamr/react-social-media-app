import express from 'express'
import { comparePassword, hashPassword } from '../helpers/bcrypt.helper.js'
import { createUser, getUserByUsername } from '../models/User.model.js'
const authRouter = express.Router()

// REGISTER
authRouter.post('/register', async (req, res) => {
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

authRouter.post('/login', async (req, res) => {
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

export default authRouter
