import express from 'express'
import { contentType } from './middlewares/content-type'

const app = express()
app.use(contentType)
export default app
