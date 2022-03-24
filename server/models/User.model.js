import User from './User.schema.js'

// REGISTER USER

export const createUser = (newUser) => {
  try {
    const user = User(newUser).save()
    console.log(user)
    return user
  } catch (error) {
    console.log(error)
  }
}

export const getUserById = (id) => {
  return User.findById(id)
}

export const getUserByUsername = (username) => {
  return User.findOne({ username })
}
export const getUserByEmail = (email) => {
  return User.findOne({ email })
}

export const updateUserProfile = (_id, updateUser) => {
  try {
    const result = User.findByIdAndUpdate(_id, updateUser, { new: true })
    return result
  } catch (error) {
    throw new Error(error)
  }
}
