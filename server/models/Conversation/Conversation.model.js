import Conversation from "./Conversation.schema.js"

export const newConversation = (newConv) => {
  try {
    const conv = Conversation(newConv).save()
    return conv
  } catch (error) {
    console.log(error)
  }
}

export const getConversation = (getConv) => {
  try {
    const conv = Conversation.find(getConv)
    return conv
  } catch (error) {
    console.log(error)
  }
}
