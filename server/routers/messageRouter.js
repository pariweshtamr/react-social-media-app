import express from "express"
import { getMessage, newMessage } from "../models/Message/Message.model.js"

const messageRouter = express.Router()

// add message
messageRouter.post("/", async (req, res) => {
  try {
    const newMsg = await newMessage(req.body)
    res.status(200).json(newMsg)
  } catch (error) {
    res.status(500).json(error)
  }
})

// get message

messageRouter.get("/:conversationId", async (req, res) => {
  try {
    const getMsg = await getMessage({
      conversationId: req.params.conversationId,
    })
    res.status(200).json(getMsg)
  } catch (error) {
    res.status(500).json(error)
  }
})

export default messageRouter
