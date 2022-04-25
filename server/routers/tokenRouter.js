import express from 'express'
import { createAccessJWT, verifyRefreshJWT } from '../helpers/jwt.helper.js'
import { getUserByEmailAndRefreshToken } from '../models/User/User.model.js'

const tokenRouter = express.Router()

tokenRouter.all('/', (req, res, next) => {
  next()
})

tokenRouter.get('/', async (req, res) => {
  try {
    const { authorization } = req.headers

    // check if the token is valid
    const { email } = verifyRefreshJWT(authorization)

    // get user
    if (email) {
      const filter = {
        email,
        refreshJWT: authorization,
      }
      const user = await getUserByEmailAndRefreshToken(filter)

      //create accessJWT and store in db
      if (user?._id) {
        const accessJWT = await createAccessJWT({ _id: user._id, email })

        // return the new accessJWT
        return res.json({
          accessJWT,
        })
      }
    }
    res.status(401).json({
      status: 'error',
      message: 'Unauthenticated',
    })
  } catch (error) {
    console.log(error)
    res.status(401).json({
      status: 'error',
      message: 'Unauthenticated',
    })
  }
})

export default tokenRouter
