import Message from "./Message.schema.js"

export const newMessage = (newMsg) => {
  try {
    const msg = Message(newMsg).save()
    return msg
  } catch (error) {
    console.log(error)
  }
}

export const getMessage = (getMsg) => {
  try {
    const msg = Message.find(getMsg)
    return msg
  } catch (error) {
    console.log(error)
  }
}
