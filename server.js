import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import cookieParser from 'cookie-parser'; 



dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes)
app.use('/api/question', questionRoutes )

app.listen(PORT, ()=>{
    console.log("server running...")
})