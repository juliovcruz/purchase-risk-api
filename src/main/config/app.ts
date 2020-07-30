import express from 'express'
import { bodyParser, contentType, cors } from './middlewares'
import transactionRoute from '../routes/transaction-risk'

const app = express()
app.use(bodyParser)
app.use(contentType)
app.use(cors)
transactionRoute(app)
export default app
