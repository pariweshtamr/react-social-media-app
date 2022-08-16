import dotenv from "dotenv"
dotenv.config()

import express from "express"
const app = express()

import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"

//SERVER STATIC CONTENT
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "/public")))

const PORT = process.env.PORT || 8000

// CONNECT MONGODB
import mongoClient from "./config/db.js"
mongoClient()

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(morgan("tiny"))

// IMPORT ROUTERS
import userRouter from "./routers/userRouter.js"
import postRouter from "./routers/postRouter.js"
import tokenRouter from "./routers/tokenRouter.js"
import conversationRouter from "./routers/conversationRouter.js"
import messageRouter from "./routers/messageRouter.js"

// USE ROUTERS
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)
app.use("/api/token", tokenRouter)
app.use("/api/conversations", conversationRouter)
app.use("/api/messages", messageRouter)

app.use("/", (req, res) => {
  res.json({ message: "Server is ready" })
})

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error)
  }
  console.log(`Backend server is running at http://localhost:${PORT}`)
})
