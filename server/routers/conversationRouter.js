import express, { request } from "express"
import {
  getConversation,
  newConversation,
} from "../models/Conversation/Conversation.model.js"

const conversationRouer = express.Router()

// new conversation

conversationRouer.post("/", async (req, res) => {
  try {
    const newConv = await newConversation({
      members: [req.body.senderId, req.body.receiverId],
    })
    res.status(200).json(newConv)
  } catch (error) {
    res.status(500).json(error)
  }
})

// get conversation of a user

conversationRouer.get("/:userId", async (req, res) => {
  try {
    const conversation = await getConversation({
      members: { $in: [req.params.userId] },
    })
    res.status(200).json(conversation)
  } catch (error) {
    res.status(500).json(error)
  }
})

export default conversationRouer
