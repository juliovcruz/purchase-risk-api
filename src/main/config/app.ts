import express from 'express'
import { bodyParser, contentType, cors } from './middlewares'

const app = express()
app.use(bodyParser)
app.use(contentType)
app.use(cors)
export default app
