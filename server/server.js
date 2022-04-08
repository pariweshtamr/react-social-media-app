import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

const PORT = process.env.PORT || 8000

// CONNECT MONGODB
import mongoClient from './config/db.js'
mongoClient()

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(morgan('common'))

// IMPORT ROUTERS
import userRouter from './routers/userRouter.js'

// USE ROUTERS
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
  res.send('Welcome to Home Page')
})

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error)
  }
  console.log(`Backend server is running at http://localhost:${PORT}`)
})
