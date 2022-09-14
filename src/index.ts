import express, { Application, Request, Response } from 'express'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import imageRouter from './Routers/imageRouter'
import path from 'path'
dotenv.config()
const PORT = process.env.PORT

const app: Application = express()

app.set('view engine', 'pug')
app.set('views', path.join(process.cwd(), './src/views'))

app.use(morgan('dev'))

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my API')
})

app.use('/api', imageRouter)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

export default app
