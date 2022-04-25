import axios from 'axios'

export const getNewAccessJWT = async () => {
  try {
    const { data } = await axios.get('/token', {
      headers: {
        authorization: window.localStorage.getItem('refreshJWT'),
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateAccessJWT = async () => {
  try {
    window.sessionStorage.removeItem('accessJWT')

    const { accessJWT } = await getNewAccessJWT()
    if (accessJWT) {
      window.sessionStorage.setItem('accessJWT', accessJWT)
    }

    return window.sessionStorage.getItem('accessJWT')
  } catch (error) {
    console.log(error)
    return false
  }
}
