import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { bookRoutes } from './routes/bookRoute.js'

export const app = express()
const port = 9000

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', bookRoutes)

app.listen(port, () => console.log(`Server is running on port ${port}`))
