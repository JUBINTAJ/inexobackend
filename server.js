import express from 'express'
import dotenv from 'dotenv'
import { main } from './src/config/db.config.js'
import cookieParser from 'cookie-parser'
import errorHandler from './src/middlewares/errorhandler.js'
import userroutes from './src/routes/userRoute.js'
import adminRouter from './src/routes/adminroutes.js'
import complientRouter from './src/routes/usercomplints.js'
import cors from 'cors';

dotenv.config()

const app = express()
const port = process.env.PORT || 7000



app.use(cors(
  {
         origin:'https://inexofrontend.vercel.app',

    // origin:'https://inexofrontend.vercel.app',
    credentials:true
  }
));



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

main().catch(err => console.log(err))

app.use('/api/user', userroutes)
app.use('/api/admin',adminRouter)
app.use('/api/user',complientRouter)


app.get('/', (req, res) => {
  res.send("Server is running")
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
