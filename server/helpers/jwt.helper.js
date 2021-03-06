import jwt from 'jsonwebtoken'
import { storeSession } from '../models/Session/Session.model.js'
import { setRefreshJWT } from '../models/User/User.model.js'

export const createAccessJWT = async ({ _id, email }) => {
  const token = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '1d',
  })
  // STORE IN DB
  const result = await storeSession({ type: 'accessJWT', token, userId: _id })

  if (result?._id) {
    return token
  }
  return
}

const createRefreshJWT = async (_id, email) => {
  const token = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  })

  //STORE IN DB
  const result = await setRefreshJWT(_id, token)

  if (result?._id) {
    return token
  }
  return
}

export const getJWTs = async ({ _id, email }) => {
  if (!_id && !email) {
    return false
  }
  const accessJWT = await createAccessJWT({ _id, email })
  const refreshJWT = await createRefreshJWT(_id, email)
  return { accessJWT, refreshJWT }
}

export const verifyRefreshJWT = (refreshJWT) => {
  return jwt.verify(refreshJWT, process.env.JWT_REFRESH_SECRET)
}

export const verifyAccessJWT = (accessJWT) => {
  try {
    return jwt.verify(accessJWT, process.env.JWT_ACCESS_SECRET)
  } catch (error) {
    return error.message
  }
}
